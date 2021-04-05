import { Type } from 'class-transformer';

import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

import { PaginateDto } from 'src/shared/dto/paginate.dto';

export interface FindManySearchOptions {
  text: string;
}

class SearchDto implements FindManySearchOptions {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class FindManyDto {
  @Type(() => SearchDto)
  @IsOptional()
  @ValidateNested()
  search?: SearchDto;

  @Type(() => PaginateDto)
  @IsOptional()
  @ValidateNested()
  paginate?: PaginateDto;
}
