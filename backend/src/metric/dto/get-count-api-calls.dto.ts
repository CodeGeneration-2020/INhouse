import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiService } from '../types';

export class GetCountApiCallsDto {
  @IsEnum(ApiService)
  @IsNotEmpty()
  service: ApiService;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  method?: string;
}
