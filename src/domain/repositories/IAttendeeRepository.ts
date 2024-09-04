import { Attendee } from '../entities/Attendee';

export interface IAttendeeRepository {
    addAttendee(attendee: Attendee): Promise<void>;
    removeAttendee(userId: string, eventId: string): Promise<void>;
    findAttendeesByEvent(eventId: string): Promise<Attendee[]>;
}
