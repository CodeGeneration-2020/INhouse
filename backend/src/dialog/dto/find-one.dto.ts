import { IsString, IsNotEmpty } from 'class-validator';

export class FindOneDto {
  @IsString()
  @IsNotEmpty()
  relatedTo: string;

  @IsString()
  @IsNotEmpty()
  question: string;
}
