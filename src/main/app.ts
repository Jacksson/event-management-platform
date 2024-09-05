import 'reflect-metadata'; // Necesario para tsyringe
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from "express-rate-limit";
import { apiRoutes } from  '../infrastructure/api/routes'
import { ErrorHandlingMiddleware } from '@infrastructure/api/middlewares/ErrorHandlingMiddleware';
import {LoggingMiddleware} from "@infrastructure/api/middlewares/LoggingMiddleware";
import {Logger} from "@shared/utils/Logger";
import {metricsService} from "@infrastructure/observability/MetricsService";
import {idempotencyMiddleware} from "@infrastructure/api/middlewares/IdempotencyMiddleware";

export const createApp = (): Application => {
    const app = express();

    // Configuración de Rate Limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100, // Límite de 100 solicitudes por IP
        message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.',
        headers: true, // Devuelve los headers X-RateLimit-* para ayudar a los clientes a manejar sus solicitudes
    });

    // Middleware de seguridad
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                imgSrc: ["'self'", "data:"],
                connectSrc: ["'self'", "https://api.mapbox.com"], // Permitir Mapbox API
            },
        },
        hidePoweredBy: true,            // Remueve el header X-Powered-By
        frameguard: { action: 'deny' }, // Previene que el contenido sea embebido en iframes
        xssFilter: true,                // Previene ataques XSS
        noSniff: true,                  // Evita que los navegadores deduzcan el tipo de contenido de respuestas MIME
    }));                                // Configura HTTP headers de seguridad
    app.use(cors({
        origin: ['http://localhost:3000', 'https://coordinadora.com'], // Dominios permitidos
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));                    // Habilita CORS con opciones predeterminadas
    app.use(morgan('combined', {
        stream: {
            write: (message) => Logger.info(message.trim()), // Redirigir logs a Winston
        },
    }));                                // Logging de solicitudes HTTP

    // Middleware de parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(limiter);
    app.use(LoggingMiddleware.logRequests);
    app.use(apiRoutes);
    app.use(ErrorHandlingMiddleware);
    // app.use(idempotencyMiddleware); //TODO: habilitar si se desea idenpotency en todas las rutas

    metricsService.setupMetricsEndpoint(app);

    return app;
};