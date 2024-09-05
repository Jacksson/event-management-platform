import { LocationService as DomainLocationService } from '@domain/services/LocationService';
import { Coordinates } from '@domain/value-objects/Coordinates';
import { Location } from '@domain/entities/Location';
import {inject, injectable} from "tsyringe";

@injectable()
export class FindNearbyEventsUseCase {
    constructor(@inject('DomainLocationService') private readonly locationService: DomainLocationService) {}

    public async execute(latitude: number, longitude: number, radius: number): Promise<Location[]> {
        // Creación de un objeto de coordenadas
        const coordinates = new Coordinates(latitude, longitude);

        // Llamada al servicio de dominio para obtener ubicaciones cercanas
        return this.locationService.findNearbyEvents(coordinates, radius);
    }
}
