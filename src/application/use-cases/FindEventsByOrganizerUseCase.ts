import { IEventRepository } from '@domain/repositories/IEventRepository';
import { Event } from '@domain/entities/Event';

export class FindEventsByOrganizerUseCase {
    constructor(private eventRepository: IEventRepository) {}

    public async execute(organizerId: string): Promise<Event[]> {
        return this.eventRepository.findByOrganizer(organizerId);
    }
}