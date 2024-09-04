import { ValidationError } from 'class-validator';
import { HttpError } from './HttpError';

export class ValidationHttpError extends HttpError {
    public validationErrors: ValidationError[];

    constructor(message: string, validationErrors: ValidationError[]) {
        super(message, 400);
        this.validationErrors = validationErrors;
    }
}