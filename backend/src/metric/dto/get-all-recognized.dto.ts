import { Type } from 'class-transformer';

import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

import { PaginateDto } from 'src/shared/dto/paginate.dto';

export interface GetAllRecognizedSearchOptions {
  username: string;
}

class SearchDto implements GetAllRecognizedSearchOptions {
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class GetAllRecognizedDto {
  @Type(() => SearchDto)
  @IsOptional()
  @ValidateNested()
  search?: SearchDto;

  @Type(() => PaginateDto)
  @IsOptional()
  @ValidateNested()
  paginate?: PaginateDto;
}
