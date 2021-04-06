import { Role } from 'src/shared/role.enum';
import { PaginateOptions } from 'src/shared/dto/paginate.dto';

import { GetAllSearchOptions } from './dto/get-all.dto';

export interface CreateOptions {
  username: string;
  role: Role;
  password: string;
}

export interface GetOptions {
  id: string;
}

export interface GetAllOptions {
  search?: GetAllSearchOptions;
  paginate?: PaginateOptions;
}

export interface EditOptions {
  id: string;
  customerName?: string;
  contactName?: string;
  email?: string;
}

export interface DeleteOptions {
  id: string;
}
