import { PaginateOptions } from 'src/shared/dto/paginate.dto';

import { Dialog, SavedDialog } from './types';

import { FindManySearchOptions } from './dto/find-many.dto';

export type CreateOneDialog = Dialog;

export type CreateManyDialogs = Dialog[];

export interface FindOneOptions {
  relatedTo: string;
  question: string;
}

export interface FindManyOptions {
  search?: FindManySearchOptions;
  paginate?: PaginateOptions;
}

export type CreateOneResult = SavedDialog;

export type CreateManyResult = SavedDialog[];

export type FindOneResult = SavedDialog;

export type FindManyResult = SavedDialog[];
