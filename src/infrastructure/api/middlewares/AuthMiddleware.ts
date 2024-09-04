import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: jwt.JwtPayload;
}

export class AuthMiddleware {
    public static authenticate(req: CustomRequest, res: Response, next: NextFunction): void {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(new Error('Authorization header is missing'));
        }

        const tokenParts = authorizationHeader.split(' ');

        if (tokenParts.length !== 2) {
            return next(new Error('No token provided'));
        }

        const token = tokenParts[1];
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            return next(new Error('JWT secret is not defined'));
        }

        try {
            const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
            req.user = decoded;
            next();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Invalid token';
            return next(new Error(errorMessage));
        }
    }
}