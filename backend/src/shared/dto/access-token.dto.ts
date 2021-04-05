import { IsString, IsNotEmpty } from 'class-validator';

export class AccessTokenDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
