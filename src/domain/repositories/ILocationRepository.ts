import { Location } from '../entities/Location';

export interface ILocationRepository {
    findNearbyLocations(latitude: number, longitude: number, radius: number): Promise<Location[]>;
}
