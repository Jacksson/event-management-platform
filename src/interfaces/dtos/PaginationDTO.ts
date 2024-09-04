import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDTO {
    @IsOptional()
    @IsNumber()
    public page?: number;

    @IsOptional()
    @IsNumber()
    public limit?: number;
}
