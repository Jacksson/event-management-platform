import { IAttendeeRepository } from '@domain/repositories/IAttendeeRepository';
import { Attendee } from '@domain/entities/Attendee';

export class RegisterAttendeeUseCase {
    constructor(private attendeeRepository: IAttendeeRepository) {}

    public async execute(attendeeData: any): Promise<void> {
        const attendee = new Attendee(
            attendeeData.userId,
            attendeeData.eventId
        );
        await this.attendeeRepository.addAttendee(attendee);
    }
}