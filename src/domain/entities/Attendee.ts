import { BaseEntity } from './BaseEntity';

export class Attendee extends BaseEntity {
    userId: string;
    eventId: string;

    constructor(userId: string, eventId: string) {
        super();
        this.userId = userId;
        this.eventId = eventId;
    }
}
