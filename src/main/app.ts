import 'reflect-metadata'; // Necesario para tsyringe
import express, { Application } from 'express';
import { container } from 'tsyringe';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiRoutes } from '@infrastructure/api/routes';
import { ErrorHandlingMiddleware } from '@infrastructure/api/middlewares/ErrorHandlingMiddleware';
import {LoggingMiddleware} from "@infrastructure/api/middlewares/LoggingMiddleware";

export const createApp = (): Application => {
    const app = express();

    // Middleware de seguridad
    app.use(helmet()); // Configura HTTP headers de seguridad
    app.use(cors()); // Habilita CORS con opciones predeterminadas
    app.use(morgan('combined')); // Logging de solicitudes HTTP

    // Middleware de parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(LoggingMiddleware.logRequests);
    app.use(apiRoutes);
    app.use(ErrorHandlingMiddleware);

    // Middleware de manejo de errores
    //app.use(container.resolve(ErrorHandlingMiddleware).handle);

    return app;
};