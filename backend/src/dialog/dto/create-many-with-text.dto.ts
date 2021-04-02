import { IsString, IsNotEmpty } from 'class-validator';

export class CreateManyWithTextDto {
  @IsString()
  @IsNotEmpty()
  relatedTo: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
