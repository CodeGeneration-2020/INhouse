import { IsIn, IsString, IsNotEmpty } from 'class-validator';

import { Role } from 'src/shared/role.enum';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsIn([Role.PRE, Role.SDRE])
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  password: string;
}
