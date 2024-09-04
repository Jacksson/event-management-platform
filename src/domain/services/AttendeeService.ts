import { IAttendeeRepository } from '../repositories/IAttendeeRepository';
import { IEventRepository } from '../repositories/IEventRepository';
import { Attendee } from '../entities/Attendee';

export class AttendeeService {
    constructor(
        private readonly attendeeRepository: IAttendeeRepository,
        private readonly eventRepository: IEventRepository
    ) {}

    async registerAttendee(eventId: string, userId: string): Promise<void> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        const attendee = new Attendee(userId, eventId);
        event.addAttendee(userId);

        await this.attendeeRepository.addAttendee(attendee);
        await this.eventRepository.update(event);
    }

    async unregisterAttendee(eventId: string, userId: string): Promise<void> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        event.removeAttendee(userId);

        await this.attendeeRepository.removeAttendee(userId, eventId);
        await this.eventRepository.update(event);
    }

    async getAttendeesByEvent(eventId: string): Promise<Attendee[]> {
        return await this.attendeeRepository.findAttendeesByEvent(eventId);
    }
}
