import { Role } from 'src/shared/role.enum';

export interface CreateOptions {
  username: string;
  role: Role;
  password: string;
}

export interface GetOptions {
  id: string;
}

export interface GetAllOptions {
  search?: {
    username?: string;
  };
  paginate?: {
    limit?: number;
    offset?: number;
  };
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
