import { InjectModel } from '@nestjs/mongoose';

import {
  Inject,
  Injectable,
  forwardRef,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { Model, FilterQuery } from 'mongoose';

import { AuthService } from '../auth/auth.service';

import { User, UserDocument } from './schemas/user.schema';

import { GetUserDto } from './dto/get-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
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

    return {
      success: true,
    };
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

    // TODO: use serializer for public user fields
    return {
      id: user.id,
      username: user.username,
      customerName: user.customerName,
      contactName: user.contactName,
      email: user.email,
    };
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

    // TODO: use serializer for public user fields
    return this.get({ id: user.id });
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
