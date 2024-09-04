import axios from 'axios';

export class MapboxService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor() {
        this.apiKey = process.env.MAPBOX_API_KEY || '';
        this.baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    }

    public async getNearbyLocations(latitude: number, longitude: number, radius: number): Promise<any> {
        try {
            const url = `${this.baseUrl}/${longitude},${latitude}.json`;
            const response = await axios.get(url, {
                params: {
                    access_token: this.apiKey,
                    proximity: `${longitude},${latitude}`,
                    limit: 10, //ajustar el límite según tus necesidades, usando setting o config global
                    radius,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching nearby locations from Mapbox:', error);
            throw new Error('Failed to fetch nearby locations');
        }
    }

    public async geocodeAddress(address: string): Promise<any> {
        try {
            const url = `${this.baseUrl}/${encodeURIComponent(address)}.json`;
            const response = await axios.get(url, {
                params: {
                    access_token: this.apiKey,
                    limit: 1,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error geocoding address with Mapbox:', error);
            throw new Error('Failed to geocode address');
        }
    }
}