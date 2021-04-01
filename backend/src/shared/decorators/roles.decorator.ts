import { SetMetadata } from '@nestjs/common';

import { Role } from '../role.enum';

export const Roles = (roles: Role[]) => {
  return SetMetadata('roles', new Set(roles));
};
