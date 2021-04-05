import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { DialogDto } from './dialog.dto';

export class CreateManyDto {
  @Type(() => DialogDto)
  @ValidateNested({
    each: true,
  })
  dialogs: DialogDto[];
}
