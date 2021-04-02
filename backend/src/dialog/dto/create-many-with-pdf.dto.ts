import { IsString, IsNotEmpty } from 'class-validator';

export class CreateManyWithPdfDto {
  @IsString()
  @IsNotEmpty()
  relatedTo: string;
}
