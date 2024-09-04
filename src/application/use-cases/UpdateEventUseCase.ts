import { IEventRepository } from '@domain/repositories/IEventRepository';
import { Event } from '@domain/entities/Event';

export class UpdateEventUseCase {
    constructor(private eventRepository: IEventRepository) {}

    public async execute(eventData: any): Promise<Event> {
        const event = new Event(
            eventData.name,
            eventData.description,
            eventData.date,
            eventData.location,
            eventData.organizerId
        );
        return this.eventRepository.update(event);
    }
}