import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
