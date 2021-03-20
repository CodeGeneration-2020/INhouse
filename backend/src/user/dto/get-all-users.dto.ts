import { IsNumber, IsOptional } from 'class-validator';

export class GetAllUsersDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;
}
