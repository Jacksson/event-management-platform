import { IsUUID } from 'class-validator';

export class AttendeeDTO {
    @IsUUID()
    public eventId!: string;

    @IsUUID()
    public userId!: string;
}
