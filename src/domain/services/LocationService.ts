import { ILocationRepository } from '../repositories/ILocationRepository';
import { Coordinates } from '../value-objects/Coordinates';
import { Location } from '../entities/Location';
import {GeocodingService} from "@domain/services/GeocodingService";
import {inject, injectable} from "tsyringe";

@injectable()
export class LocationService {

    constructor(
        @inject('ILocationRepository') private readonly locationRepository: ILocationRepository,
        @inject(GeocodingService) private readonly geocodingService: GeocodingService
    ) {}

    async findNearbyEvents(coordinates: Coordinates, radius: number): Promise<Location[]> {
        return await this.locationRepository.findNearbyLocations(
            coordinates.getLatitude(),
            coordinates.getLongitude(),
            radius
        );
    }

    public async geocodeAddress(address: string): Promise<Coordinates> {
        const geocodeResult = await this.geocodingService.geocodeAddress(address);
        return new Coordinates(geocodeResult.latitude, geocodeResult.longitude);
    }

    public switchGeocodingProvider(useMapbox: boolean): void {
        this.geocodingService.setProvider(useMapbox);
    }
}

// TODO: importar y complementar
/*
import 'reflect-metadata';
import { container } from 'tsyringe';
import { GeocodingService } from '@infrastructure/external/GeocodingService';
import { LocationService } from '@domain/services/LocationService';
import { MapboxService } from '@infrastructure/external/mapbox/MapboxService';
import { PostgisService } from '@infrastructure/external/postgis/PostgisService';
import { ILocationRepository } from '@domain/repositories/ILocationRepository';
import { UserRepository } from '@infrastructure/db/UserRepository';

// Instancia de servicios
const mapboxService = new MapboxService();
const postgisService = new PostgisService();

// Registra las instancias en el contenedor
container.register('GeocodingService', {
    useValue: new GeocodingService(mapboxService, postgisService, true) // Inicialmente usa Mapbox
});

container.register<ILocationRepository>('ILocationRepository', {
    useClass: UserRepository // Asegúrate de tener esta implementación
});

container.register(LocationService, {
    useClass: LocationService
});
 */

/*
import { container } from 'tsyringe';
import { LocationService } from '@domain/services/LocationService';

const locationService = container.resolve(LocationService);

// Usa locationService en tu aplicación

*/