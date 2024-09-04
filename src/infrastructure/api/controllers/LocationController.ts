import { Request, Response } from 'express';
import { FindNearbyEventsUseCase } from '@application/use-cases/FindNearbyEventsUseCase';
import {HttpStatusCodes} from "@shared/contants/HttpStatusCodes";
import {inject, injectable} from "tsyringe";

@injectable()
export class LocationController {
    constructor(@inject(FindNearbyEventsUseCase) private findNearbyEventsUseCase: FindNearbyEventsUseCase) {}

    public async findNearbyEvents(req: Request, res: Response): Promise<void> {
        try {
            const latitude = parseFloat(req.query.latitude as string);
            const longitude = parseFloat(req.query.longitude as string);
            const radius = parseFloat(req.query.radius as string);

            if (isNaN(latitude) || isNaN(longitude) || isNaN(radius)) {
                throw new Error('Invalid query parameters');
            }

            const events = await this.findNearbyEventsUseCase.execute(latitude, longitude, radius);
            res.status(HttpStatusCodes.OK).json(events);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }
}