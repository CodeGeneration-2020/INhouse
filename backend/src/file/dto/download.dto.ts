import { IsString, IsNotEmpty } from 'class-validator';

import { AccessTokenDto } from 'src/shared/dto/access-token.dto';

export class DownloadDto extends AccessTokenDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
