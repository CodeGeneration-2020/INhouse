import { Type } from 'class-transformer';

import { PaginateDto } from 'src/shared/dto/paginate.dto';

import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export interface GetAllSearchOptions {
  username: string;
}

class SearchDto implements GetAllSearchOptions {
  @IsString()
  @IsNotEmpty()
  username: string;
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
