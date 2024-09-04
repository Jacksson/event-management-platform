import { ILocationRepository } from '@domain/repositories/ILocationRepository';
import { Location } from '@domain/entities/Location';

export class LocationService {
    constructor(private readonly locationRepository: ILocationRepository) {}

    public async findNearbyEvents(latitude: number, longitude: number, radius: number): Promise<Location[]> {
        return this.locationRepository.findNearbyLocations(latitude, longitude, radius);
    }
}
