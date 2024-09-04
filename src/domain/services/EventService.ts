import { IEventRepository } from '../repositories/IEventRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { Event } from '../entities/Event';
import { User } from '../entities/User';
import {inject, injectable} from "tsyringe";

@injectable()
export class EventService {
    constructor(
        @inject('IEventRepository') private readonly eventRepository: IEventRepository,
        @inject('IUserRepository')  private readonly userRepository: IUserRepository
    ) {}

    async createEvent(event: Event, organizerId: string): Promise<Event[]> {
        const organizer: User | null = await this.userRepository.findById(organizerId);
        if (!organizer) {
            throw new Error('Organizer not found');
        }
        event.organizerId = organizerId;
        return await this.eventRepository.create(event);
    }

    async updateEvent(eventId: string, updatedEvent: Partial<Event>, organizerId: string): Promise<Event> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.organizerId !== organizerId) {
            throw new Error('Unauthorized operation');
        }
        const updatedEntity = Object.assign(event, updatedEvent);
        return await this.eventRepository.update(updatedEntity);
    }

    async deleteEvent(eventId: string, organizerId: string): Promise<void> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.organizerId !== organizerId) {
            throw new Error('Unauthorized operation');
        }
        await this.eventRepository.delete(eventId);
    }

    async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
        return await this.eventRepository.findByOrganizer(organizerId);
    }
}
