import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { ValidationHttpError } from '@domain/errors/ValidationHttpError';
import {Logger} from "@shared/utils/Logger";
import {HttpError} from "@domain/errors/HttpError";

export function validationMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);

    if (Array.isArray(err) && err.some(e => e instanceof ValidationHttpError)) {
        // Manejo de errores de validación
        const validationError = new ValidationHttpError('Validation failed', err);
        Logger.warn(validationError.message);
        res.status(validationError.status).json({
            error: validationError.message,
            validationErrors: validationError.validationErrors
        });
    }

    if (!(err instanceof HttpError)) {
        // Convertir errores no controlados a HttpError
        err = new HttpError(err.message || 'Internal Server Error', err.status || 500);
    }

    if (!errors.isEmpty()) {
        const validationErrors: ValidationError[] = errors.array();
        const validationError = new ValidationHttpError('Validation failed', err);

        // Loguear el error de validación
        Logger.warn(validationError.message);

         // Responder con mensajes de error
        const response = {
            error: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack, details: err.details })
        };

        res.status(err.status).json(response);
    }
    next();
}