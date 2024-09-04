import { IEventRepository } from '@domain/repositories/IEventRepository';
import { Event } from '@domain/entities/Event';

export class FindEventByIdUseCase {
    constructor(private eventRepository: IEventRepository) {}

    public async execute(eventId: string): Promise<Event | null> {
        return this.eventRepository.findById(eventId);
    }
}