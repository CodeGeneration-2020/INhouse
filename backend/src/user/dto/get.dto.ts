import { IsString, IsOptional } from 'class-validator';

export class GetDto {
  @IsString()
  @IsOptional()
  id?: string;
}
