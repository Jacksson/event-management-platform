import { ILocationRepository } from '@domain/repositories/ILocationRepository';
import { Location } from '@domain/entities/Location';
import {inject, injectable} from "tsyringe";

@injectable()
export class LocationService {
    constructor(
        @inject('ILocationRepository') private readonly locationRepository: ILocationRepository) {}

    public async findNearbyEvents(latitude: number, longitude: number, radius: number): Promise<Location[]> {
        return this.locationRepository.findNearbyLocations(latitude, longitude, radius);
    }
}
