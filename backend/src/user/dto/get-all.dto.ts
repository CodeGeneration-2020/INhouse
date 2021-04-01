import { IsNumber, IsOptional } from 'class-validator';

export class GetAllDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;
}
