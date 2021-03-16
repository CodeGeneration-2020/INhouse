import { IsString, IsNotEmpty } from 'class-validator';

export class GetAnalysisDto {
  @IsString()
  @IsNotEmpty()
  linkedInUrl: string;
}
