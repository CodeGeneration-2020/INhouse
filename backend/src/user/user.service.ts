import { InjectModel } from '@nestjs/mongoose';

import {
  Inject,
  Injectable,
  forwardRef,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { Model, FilterQuery } from 'mongoose';

import { AuthService } from '../auth/auth.service';

import { GetAllOptions } from './user.service.types';

import { User, UserDocument } from './schemas/user.schema';

import { GetUserDto } from './dto/get-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOne(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter);
  }

  async findById(id: any) {
    return this.findOne({ _id: id });
  }

  async create(createUserDto: CreateUserDto) {
    let user = await this.findOne({
      username: createUserDto.username,
    });

    if (user) {
      throw new ConflictException('User already exist');
    }

    user = new this.userModel(createUserDto);

    await user.save();

    return plainToClass(User, user, {
      groups: ['admin'],
      excludeExtraneousValues: true,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findOne({
      username: loginUserDto.username,
    });

    return this.authService.login(user);
  }

  async get(getUserDto: GetUserDto) {
    const user = await this.findById(getUserDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToClass(User, user, {
      groups: ['admin'],
      excludeExtraneousValues: true,
    });
  }

  async getAll({ limit = 10, offset = 0 }: GetAllOptions) {
    const query = this.userModel.find();

    query.limit(limit);
    query.skip(offset);
    query.lean();

    const users = await query.exec();

    return plainToClass(User, users, {
      groups: ['admin'],
      excludeExtraneousValues: true,
    });
  }

  async edit(editUserDto: EditUserDto) {
    const user = await this.findById(editUserDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // NOTE: maybe use Object.assing?
    if (editUserDto.customerName) {
      user.customerName = editUserDto.customerName;
    }

    if (editUserDto.contactName) {
      user.contactName = editUserDto.contactName;
    }

    if (editUserDto.email) {
      user.email = editUserDto.email;
    }

    await user.save();

    return plainToClass(User, user, {
      groups: ['admin'],
      excludeExtraneousValues: true,
    });
  }

  async delete(deleteUserDto: DeleteUserDto) {
    const user = await this.findById(deleteUserDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.remove();

    return {
      success: true,
    };
  }
}
