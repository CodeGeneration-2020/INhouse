import { IsString, IsNotEmpty } from 'class-validator';

export class DownloadDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
