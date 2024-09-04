
import { IAttendeeRepository } from '@domain/repositories/IAttendeeRepository';
import { Attendee } from '@domain/entities/Attendee';

export class AttendeeService {
    constructor(private readonly attendeeRepository: IAttendeeRepository) {}

    public async registerAttendee(attendeeData: any): Promise<void> {
        const attendee = new Attendee(
            attendeeData.userId,
            attendeeData.eventId
        );
        await this.attendeeRepository.addAttendee(attendee);
    }

    public async removeAttendee(userId: string, eventId: string): Promise<void> {
        await this.attendeeRepository.removeAttendee(userId, eventId);
    }

    public async findAttendeesByEvent(eventId: string): Promise<Attendee[]> {
        return this.attendeeRepository.findAttendeesByEvent(eventId);
    }
}
