import { IsString, IsOptional } from 'class-validator';

export class GetUserDto {
  @IsString()
  @IsOptional()
  id?: string;
}
