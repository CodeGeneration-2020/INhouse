export interface CreateOptions {
  username: string;
  password: string;
}

export interface GetOptions {
  id: string;
}

export interface GetAllOptions {
  limit?: number;
  offset?: number;
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
