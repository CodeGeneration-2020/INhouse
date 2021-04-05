import { IsEnum, IsString, IsDefined, IsOptional } from 'class-validator';

import { ApiService } from '../types';

export class GetCountApiCallsDto {
  @IsEnum(ApiService)
  @IsDefined()
  service: ApiService;

  @IsString()
  @IsOptional()
  method?: string;
}
