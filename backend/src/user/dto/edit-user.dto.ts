import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  customerName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  contactName?: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email?: string;
}
