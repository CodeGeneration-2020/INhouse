import { Dialog } from '../types';

export interface GetOptions {
  question: string;
}

export interface GetAllOptions {
  search?: {
    text: string;
  };
  paginate?: {
    limit: number;
    offset: number;
  };
}

export interface UploadOptions {
  dialogs: Dialog[];
}
