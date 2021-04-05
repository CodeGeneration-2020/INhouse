import { IsString, IsNotEmpty } from 'class-validator';

import { Dialog } from '../types';

export class DialogDto implements Dialog {
  @IsString()
  @IsNotEmpty()
  relatedTo: string;

  @IsString()
  @IsNotEmpty()
  context: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
