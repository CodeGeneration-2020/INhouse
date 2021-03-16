import { IsString, IsNotEmpty } from 'class-validator';

export class GetAnswerDto {
  @IsString()
  @IsNotEmpty()
  question: string;
}
