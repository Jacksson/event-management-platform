import { Request, Response, NextFunction } from 'express';

export class LoggingMiddleware {
    public static logRequests(req: Request, res: Response, next: NextFunction): void {
        console.log(`${req.method} ${req.url}`);
        next();
    }
}
