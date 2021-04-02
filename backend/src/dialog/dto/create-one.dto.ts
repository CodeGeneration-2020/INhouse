import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { DialogDto } from './dialog.dto';

export class CreateOneDto {
  @Type(() => DialogDto)
  @ValidateNested()
  dialog: DialogDto;
}
