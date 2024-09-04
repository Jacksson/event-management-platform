import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';
import { HttpError } from '@domain/errors/HttpError';
import { ValidationHttpError } from '@domain/errors/ValidationHttpError';
import {Logger} from "@shared/utils/Logger";

// Middleware de manejo de errores
export const ErrorHandlingMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (Array.isArray(err) && err.some(e => e instanceof ValidationError)) {
        // Manejo de errores de validación
        const validationError = new ValidationHttpError('Validation failed', err);
        Logger.warn(validationError.message);
        return res.status(validationError.status).json({
            error: validationError.message,
            validationErrors: validationError.validationErrors
        });
    }

    if (!(err instanceof HttpError)) {
        // Convertir errores no controlados a HttpError
        err = new HttpError(err.message || 'Internal Server Error', err.status || 500);
    }

    // Loguear el error
    Logger.error(err.message); // Simplificado el logger

    // Responder con mensajes de error
    const response = {
        error: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack, details: err.details })
    };

    res.status(err.status).json(response);
};

// todo usar el middleware de errores en el servidor
// import express from 'express';
// const app = express();

// app.use('/some-route', someRouteHandler);
// app.use(ErrorHandlingMiddleware);