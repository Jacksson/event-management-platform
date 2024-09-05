import { Request, Response } from 'express';
import { EventService } from '@application/services/EventService';
import {autoInjectable, inject, injectable} from "tsyringe";
import {HttpStatusCodes} from "@shared/contants/HttpStatusCodes";
import {ErrorMessages} from "@shared/contants/ErrorMessages";

@autoInjectable()
export class EventController {
    constructor(private eventService: EventService) {}

    public async createEvent(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body) {
                throw new Error('Request body is missing');
            }
            const event = await this.eventService.createEvent(req.body);
            res.status(HttpStatusCodes.CREATED).json(event);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : ErrorMessages.UNKNOWN_ERROR;
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }

    public async updateEvent(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body) {
                throw new Error('Request body is missing');
            }
            const event = await this.eventService.updateEvent(req.body);
            res.status(HttpStatusCodes.OK).json(event);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : ErrorMessages.UNKNOWN_ERROR;
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }

    public async getEventById(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.eventId;
            if (!eventId) {
                throw new Error('Event ID is missing');
            }
            const event = await this.eventService.getEventById(eventId);
            if (event) {
                res.status(HttpStatusCodes.OK).json(event);
            } else {
                res.status(HttpStatusCodes.NOT_FOUND).json({ error: ErrorMessages.EVENT_NOT_FOUND });
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : ErrorMessages.UNKNOWN_ERROR;
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }

    public async deleteEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.eventId;
            if (!eventId) {
                throw new Error('Event ID is missing');
            }
            await this.eventService.deleteEvent(eventId);
            res.status(HttpStatusCodes.NOT_FOUND).send();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : ErrorMessages.UNKNOWN_ERROR;
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }

    public async getEventsByOrganizer(req: Request, res: Response): Promise<void> {
        try {
            const organizerId = req.params.organizerId;
            if (!organizerId) {
                throw new Error('Organizer ID is missing');
            }
            const events = await this.eventService.getEventsByOrganizer(organizerId);
            res.status(HttpStatusCodes.OK).json(events);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : ErrorMessages.UNKNOWN_ERROR;
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMessage });
        }
    }
}