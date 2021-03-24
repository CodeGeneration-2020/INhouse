import { IsNumber, IsOptional } from 'class-validator';

export class GetAllRecognizedDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;
}
