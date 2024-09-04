import { IEventRepository } from '@domain/repositories/IEventRepository';
import { Event } from '@domain/entities/Event';
import { QueryTypes } from 'sequelize';
import {sequelize} from "@infrastructure/db/orm/Sequelize";
import {Location} from "@domain/entities/Location";
import {injectable} from "tsyringe";

@injectable()
export class EventRepository implements IEventRepository {
    public async create(event: Event): Promise<Event[]> {
        const result = await sequelize.query(
            `INSERT INTO events (id, name, description, date, location, organizerId)
             VALUES (:id, :name, :description, :date, :location, :organizerId)
             RETURNING *`,
            {
                replacements: {
                    id: event.id,
                    name: event.title,
                    description: event.description,
                    date: event.date,
                    location: event.location,
                    organizerId: event.organizerId
                },
                type: QueryTypes.INSERT
            }
        );

        return result.map((createdEvent: any) => new Event(
            createdEvent.title,
            createdEvent.description,
            createdEvent.date,
            createdEvent.location,
            createdEvent.organizerId
        ));
    }

    public async update(event: Event): Promise<Event> {
        await sequelize.query(
            `UPDATE events SET name = :name, description = :description, date = :date, location = :location, organizerId = :organizerId
             WHERE id = :id`,
            {
                replacements: {
                    id: event.id,
                    name: event.title,
                    description: event.description,
                    date: event.date,
                    location: event.location,
                    organizerId: event.organizerId
                },
                type: QueryTypes.UPDATE
            }
        );
        const updatedEvent = await this.findById(event.id);
        if (!updatedEvent) {
            throw new Error('Event not found');
        }
        return updatedEvent;
    }

    public async delete(eventId: string): Promise<void> {
        await sequelize.query(
            `DELETE FROM events WHERE id = :id`,
            {
                replacements: { id: eventId },
                type: QueryTypes.DELETE
            }
        );
    }

    public async findById(eventId: string): Promise<Event | null> {
        const result = await sequelize.query(
            `SELECT * FROM events WHERE id = :id`,
            {
                replacements: { id: eventId },
                type: QueryTypes.SELECT,
                plain: true
            }
        );

        if (!result) {
            return null;
        }

        return null;
        /*
        return new Event(
            result,title,
            result.description,
            result.date,
            result.location,
            result.organizerId
        );
*/
    }

    public async findAll(): Promise<Event[]> {
        const results = await sequelize.query(
            `SELECT * FROM events`,
            {
                type: QueryTypes.SELECT
            }
        );

        return results.map((result: any) => new Event(
            result.name,
            result.description,
            result.date,
            result.location,
            result.organizerId
        ));
    }

    public async findByOrganizer(organizerId: string): Promise<Event[]> {
        const results = await sequelize.query(
            `SELECT * FROM events WHERE organizerId = :organizerId`,
            {
                replacements: { organizerId },
                type: QueryTypes.SELECT
            }
        );

        return results.map((result: any) => new Event(
            result.name,
            result.description,
            result.date,
            result.location,
            result.organizerId
        ));
    }
}
