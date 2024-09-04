import { Request, Response } from 'express';
import {HttpStatusCodes} from "@shared/contants/HttpStatusCodes";

export class HealthCheckController {
    public async check(req: Request, res: Response): Promise<void> {
        res.status(HttpStatusCodes.OK).json({ status: 'OK', timestamp: new Date().toISOString() });
    }
}
