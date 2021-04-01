import { InjectModel } from '@nestjs/mongoose';
import { Injectable, ConflictException } from '@nestjs/common';

import { Model, FilterQuery } from 'mongoose';

import { assignExistProperties } from 'src/shared/helpers';

import {
  CreateOptions,
  GetOptions,
  GetAllOptions,
  EditOptions,
  DeleteOptions,
} from './user.types';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  findOne(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter);
  }

  findById(id: any) {
    return this.userModel.findById(id);
  }

  async create({ username, password }: CreateOptions) {
    let user = await this.findOne({ username });

    if (user) {
      throw new ConflictException('User already exist');
    }

    user = new this.userModel({ username, password });

    await user.save();

    return user;
  }

  get({ id }: GetOptions) {
    return this.findById(id);
  }

  getAll({ search, paginate }: GetAllOptions) {
    const query = this.userModel.find();

    if (search) {
      query.where('username', new RegExp(search.username));
    }

    if (paginate) {
      query.limit(paginate.limit);
      query.skip(paginate.offset);
    }

    query.lean();

    return query.exec();
  }

  async edit(options: EditOptions) {
    const user = await this.findById(options.id);

    if (!user) {
      return null;
    }

    assignExistProperties(user, options, [
      'customerName',
      'contactName',
      'email',
    ]);

    await user.save();

    return user;
  }

  async delete({ id }: DeleteOptions) {
    const user = await this.findById(id);

    if (!user) {
      return false;
    }

    await user.remove();

    return true;
  }
}
