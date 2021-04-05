import { IsNumber, IsDefined } from 'class-validator';

export interface PaginateOptions {
  limit: number;
  offset: number;
}

export class PaginateDto implements PaginateOptions {
  @IsNumber()
  @IsDefined()
  limit: number;

  @IsNumber()
  @IsDefined()
  offset: number;
}
