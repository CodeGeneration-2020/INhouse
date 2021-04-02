import { Dialog, SavedDialog } from './types';

export type CreateOneDialog = Dialog;

export type CreateManyDialogs = Dialog[];

export interface FindOneOptions {
  relatedTo: string;
  question: string;
}

export interface FindManyOptions {
  search?: {
    text: string;
  };
  paginate?: {
    limit: number;
    offset: number;
  };
}

export type CreateOneResult = SavedDialog;

export type CreateManyResult = SavedDialog[];

export type FindOneResult = SavedDialog;

export type FindManyResult = SavedDialog[];
