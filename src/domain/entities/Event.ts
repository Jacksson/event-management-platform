import { BaseEntity } from './BaseEntity';
import { Location } from './Location';

export class Event extends BaseEntity {
    title: string;
    description: string;
    date: Date;
    location: Location;
    organizerId: string;
    attendees: Set<string>;  // Lista de IDs de asistentes

    constructor(title: string, description: string, date: Date, location: Location, organizerId: string) {
        super();
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.organizerId = organizerId;
        this.attendees = new Set<string>();
    }

    addAttendee(attendeeId: string): void {
        if (this.attendees.has(attendeeId)) {
            throw new Error('Attendee is already registered');
        }
        this.attendees.add(attendeeId);
        this.updateTimestamp();
    }

    removeAttendee(attendeeId: string): void {
        if (!this.attendees.has(attendeeId)) {
            throw new Error('Attendee not found');
        }
        this.attendees.delete(attendeeId);
        this.updateTimestamp();
    }

    updateEventDetails(title: string, description: string, date: Date, location: Location): void {
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.updateTimestamp();
    }
}
