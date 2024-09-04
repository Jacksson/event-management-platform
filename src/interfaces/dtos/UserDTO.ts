import { IsString, IsEmail, IsUUID, IsOptional } from 'class-validator';

export class UserDTO {
    @IsUUID()
    public id!: string;

    @IsString()
    public name!: string;

    @IsEmail()
    public email!: string;

    @IsString()
    public password!: string;

    @IsOptional()
    @IsString()
    public role?: string;
}