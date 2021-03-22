import { IsString, IsNotEmpty } from 'class-validator';

export class GetAnalysisRequestedByUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
