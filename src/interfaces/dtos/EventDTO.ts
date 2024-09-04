import { IsString, IsDate, IsOptional, IsArray, IsUUID } from 'class-validator';

export class EventDTO {
    @IsString()
    public name!: string;

    @IsString()
    public description!: string;

    @IsDate()
    public date!: Date;

    @IsString()
    public location!: string;

    @IsUUID()
    public organizerId!: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    public attendeeIds?: string[];
}
