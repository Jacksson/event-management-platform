import {MapboxService} from "@infrastructure/external/mapbox/MapboxService";
import {PostgisService} from "@infrastructure/external/postgis/PostgisService";
import {injectable} from "tsyringe";

@injectable()
export class GeocodingService {
    private mapboxService: MapboxService;
    private postgisService: PostgisService;
    private useMapbox: boolean;

    constructor(mapboxService: MapboxService, postgisService: PostgisService, useMapbox: boolean) {
        this.mapboxService = mapboxService;
        this.postgisService = postgisService;
        this.useMapbox = useMapbox;
    }

    public async geocodeAddress(address: string): Promise<any> {
        if (this.useMapbox) {
            return await this.mapboxService.geocodeAddress(address);
        } else {
            return await this.postgisService.geocodeAddress(address);
        }
    }

    public setProvider(useMapbox: boolean): void {
        this.useMapbox = useMapbox;
    }
}
