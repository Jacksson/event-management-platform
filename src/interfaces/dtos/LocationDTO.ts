import { IsString, IsLatitude, IsLongitude } from 'class-validator';

export class LocationDTO {
    @IsString()
    public name!: string;

    @IsLatitude()
    public latitude!: number;

    @IsLongitude()
    public longitude!: number;
}
