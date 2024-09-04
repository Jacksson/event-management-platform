export class Location {
    latitude: number;
    longitude: number;
    address: string;

    constructor(latitude: number, longitude: number, address: string) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
    }

    updateLocation(latitude: number, longitude: number, address: string): void {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
    }
}
