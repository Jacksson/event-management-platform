import { ILocationRepository } from '@domain/repositories/ILocationRepository';
import { Location } from '@domain/entities/Location';
import { QueryTypes } from 'sequelize';
import {sequelize} from "@infrastructure/db/orm/Sequelize";

export class LocationRepository implements ILocationRepository {
    public async findNearbyLocations(latitude: number, longitude: number, radius: number): Promise<Location[]> {
        const results = await sequelize.query(
            `SELECT * FROM locations
             WHERE ST_Distance_Sphere(
                point(longitude, latitude),
                point(:longitude, :latitude)
             ) <= :radius`,
            {
                replacements: { latitude, longitude, radius },
                type: QueryTypes.SELECT
            }
        );
        return results.map((result: any) => new Location(
            result.name,
            result.latitude,
            result.longitude
        ));
    }
}
