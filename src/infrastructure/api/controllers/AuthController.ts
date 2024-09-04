import { Request, Response } from 'express';
import { AuthService } from '@domain/services/AuthService';
import {HttpStatusCodes} from "@shared/contants/HttpStatusCodes";
import {inject, injectable} from "tsyringe";

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    public async register(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body) {
                throw new Error('Request body is missing');
            }
            const user = await this.authService.register(req.body);
            res.status(HttpStatusCodes.CREATED).json(user);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error('Email or password is missing');
            }
            const token = await this.authService.login(email, password);
            res.status(HttpStatusCodes.OK).json({ token });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }
}