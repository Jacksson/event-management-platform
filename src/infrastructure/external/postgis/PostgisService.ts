import { QueryTypes } from 'sequelize';
import {sequelize} from "@infrastructure/db/orm/Sequelize";

export class PostgisService {
    public async getNearbyLocations(latitude: number, longitude: number, radius: number): Promise<any> {
        try {
            const query = `
                SELECT id, name, ST_Distance(location, ST_MakePoint(:longitude, :latitude)::geography) AS distance
                FROM events
                WHERE ST_DWithin(location, ST_MakePoint(:longitude, :latitude)::geography, :radius)
                ORDER BY distance;
              `;

            const locations = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: { latitude, longitude, radius },
            });

            return locations;
        } catch (error) {
            console.error('Error fetching nearby locations from PostGIS:', error);
            throw new Error('Failed to fetch nearby locations');
        }
    }

    // Método para geocodificar direcciones
    public async geocodeAddress(address: string): Promise<any> {
        try {
            const query = `
                SELECT id, ST_AsGeoJSON(location) AS location
                FROM addresses
                WHERE address ILIKE :address
                LIMIT 1;
              `;

            const result = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: { address: `%${address}%` },
            });

            if (result.length === 0) {
                throw new Error('Address not found');
            }

            return result[0];
        } catch (error) {
            console.error('Error geocoding address with PostGIS:', error);
            throw new Error('Failed to geocode address');
        }
    }
}
