import { IEventRepository } from '@domain/repositories/IEventRepository';

export class DeleteEventUseCase {
    constructor(private eventRepository: IEventRepository) {}

    public async execute(eventId: string): Promise<void> {
        await this.eventRepository.delete(eventId);
    }
}