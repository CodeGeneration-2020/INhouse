import {
  CreateOneDialog,
  CreateManyDialogs,
  FindOneOptions,
  FindManyOptions,
  CreateOneResult,
  CreateManyResult,
  FindOneResult,
  FindManyResult,
} from './dialog.types';

export abstract class DialogService {
  abstract createOne(dialog: CreateOneDialog): Promise<CreateOneResult>;

  abstract createMany(dialogs: CreateManyDialogs): Promise<CreateManyResult>;

  abstract findOne(options: FindOneOptions): Promise<FindOneResult>;

  abstract findMany(options: FindManyOptions): Promise<FindManyResult>;
}
