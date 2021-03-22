import { IsString, IsNotEmpty } from 'class-validator';

export class GetRequestHistoryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
