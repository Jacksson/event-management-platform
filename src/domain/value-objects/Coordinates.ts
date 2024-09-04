export class Coordinates {
    private readonly latitude: number;
    private readonly longitude: number;

    constructor(latitude: number, longitude: number) {
        this.validate(latitude, longitude);
        this.latitude = latitude;
        this.longitude = longitude;
    }

    private validate(latitude: number, longitude: number): void {
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            throw new Error('Invalid latitude or longitude');
        }
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public equals(other: Coordinates): boolean {
        return (
            this.latitude === other.latitude &&
            this.longitude === other.longitude
        );
    }
}
