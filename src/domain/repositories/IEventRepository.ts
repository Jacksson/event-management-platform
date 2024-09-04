import { Event } from '../entities/Event';

export interface IEventRepository {
    create(event: Event): Promise<Event[]>;
    update(event: Event): Promise<Event>;
    delete(eventId: string): Promise<void>;
    findById(eventId: string): Promise<Event | null>;
    findAll(): Promise<Event[]>;
    findByOrganizer(organizerId: string): Promise<Event[]>;
}
