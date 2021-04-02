import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

import { DialogDto } from './dialog.dto';

export class CreateOneDto {
  @Type(() => DialogDto)
  @IsDefined()
  @ValidateNested()
  dialog: DialogDto;
}
