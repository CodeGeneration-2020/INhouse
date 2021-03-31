import { Type } from 'class-transformer';

import {
  IsNumber,
  IsString,
  IsDefined,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

class SearchDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  text: string;
}

// TODO: move to shared
class PaginateDto {
  @IsNumber()
  @IsDefined()
  limit: number;

  @IsNumber()
  @IsDefined()
  offset: number;
}

export class GetAllDto {
  @Type(() => SearchDto)
  @IsOptional()
  @ValidateNested()
  search?: SearchDto;

  @Type(() => PaginateDto)
  @IsOptional()
  @ValidateNested()
  paginate?: PaginateDto;
}
