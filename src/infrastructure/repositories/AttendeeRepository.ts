import { IAttendeeRepository } from '@domain/repositories/IAttendeeRepository';
import { Attendee } from '@domain/entities/Attendee';
import { QueryTypes } from 'sequelize';
import {sequelize} from "@infrastructure/db/orm/Sequelize";

export class AttendeeRepository implements IAttendeeRepository {
    public async addAttendee(attendee: Attendee): Promise<void> {
        await sequelize.query(
            `INSERT INTO attendees (userId, eventId)
             VALUES (:userId, :eventId)`,
            {
                replacements: {
                    userId: attendee.userId,
                    eventId: attendee.eventId
                },
                type: QueryTypes.INSERT
            }
        );
    }

    public async removeAttendee(userId: string, eventId: string): Promise<void> {
        await sequelize.query(
            `DELETE FROM attendees WHERE userId = :userId AND eventId = :eventId`,
            {
                replacements: { userId, eventId },
                type: QueryTypes.DELETE
            }
        );
    }

    public async findAttendeesByEvent(eventId: string): Promise<Attendee[]> {
        const results = await sequelize.query(
            `SELECT * FROM attendees WHERE eventId = :eventId`,
            {
                replacements: { eventId },
                type: QueryTypes.SELECT
            }
        );
        return results.map((result: any) => new Attendee(
            result.userId,
            result.eventId
        ));
    }
}
