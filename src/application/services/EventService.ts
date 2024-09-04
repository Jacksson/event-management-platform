import { IEventRepository } from '@domain/repositories/IEventRepository';
import { Event } from '@domain/entities/Event';
import {inject, injectable} from "tsyringe";

@injectable()
export class EventService {
    constructor(
        @inject('IEventRepository') private readonly eventRepository: IEventRepository
    ) {}

    public async createEvent(eventData: any): Promise<Event[]> {
        const event = new Event(
            eventData.name,
            eventData.description,
            eventData.date,
            eventData.location,
            eventData.organizerId
        );
        return this.eventRepository.create(event);
    }

    public async updateEvent(eventData: any): Promise<Event> {
        const event = new Event(
            eventData.name,
            eventData.description,
            eventData.date,
            eventData.location,
            eventData.organizerId
        );
        return this.eventRepository.update(event);
    }

    public async getEventById(eventId: string): Promise<Event | null> {
        return this.eventRepository.findById(eventId);
    }

    public async deleteEvent(eventId: string): Promise<void> {
        await this.eventRepository.delete(eventId);
    }

    public async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
        return this.eventRepository.findByOrganizer(organizerId);
    }
}