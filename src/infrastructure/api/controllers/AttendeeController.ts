import { Request, Response } from 'express';
import { AttendeeService } from '@application/services/AttendeeService';
import {HttpStatusCodes} from "@shared/contants/HttpStatusCodes";
import {autoInjectable, inject, injectable} from "tsyringe";

@autoInjectable()
export class AttendeeController {
    constructor(private attendeeService: AttendeeService) {}

    public async registerAttendee(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body) {
                throw new Error('Request body is missing');
            }
            await this.attendeeService.registerAttendee(req.body);
            res.status(HttpStatusCodes.CREATED).send();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }

    public async removeAttendee(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const eventId = req.params.eventId;
            if (!userId || !eventId) {
                throw new Error('User ID or Event ID is missing');
            }
            await this.attendeeService.removeAttendee(userId, eventId);
            res.status(HttpStatusCodes.NO_CONTENT).send();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }

    public async findAttendeesByEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.eventId;
            if (!eventId) {
                throw new Error('Event ID is missing');
            }
            const attendees = await this.attendeeService.findAttendeesByEvent(eventId);
            res.status(HttpStatusCodes.OK).json(attendees);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }
}