import {MapboxService} from "@infrastructure/external/mapbox/MapboxService";
import {PostgisService} from "@infrastructure/external/postgis/PostgisService";
import {inject, injectable} from "tsyringe";
import {withCircuitBreaker} from "@infrastructure/resilience/CircuitBreakerService";

@injectable()
export class GeocodingService {
    private mapboxService: MapboxService;
    private postgisService: PostgisService;
    private useMapbox: boolean;

    constructor(
        @inject(MapboxService) mapboxService: MapboxService,
        @inject(PostgisService) postgisService: PostgisService, useMapbox: boolean) {
        this.mapboxService = mapboxService;
        this.postgisService = postgisService;
        this.useMapbox = useMapbox;
    }

    public async geocodeAddress(address: string): Promise<any> {
        if (this.useMapbox) {
            return await withCircuitBreaker(async () => {  // todo: certificar eficiencia aqui incluir en el metodo axios.get
                // Llamada a la API de Mapbox
                return await this.mapboxService.geocodeAddress(address);
            });
        } else {
            return await this.postgisService.geocodeAddress(address);
        }
    }

    public setProvider(useMapbox: boolean): void {
        this.useMapbox = useMapbox;
    }
}
