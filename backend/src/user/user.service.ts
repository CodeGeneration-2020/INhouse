import { InjectModel } from '@nestjs/mongoose';

import {
  Injectable,
  Inject,
  forwardRef,
  ConflictException,
} from '@nestjs/common';

import { Model } from 'mongoose';

import { AuthService } from '../auth/auth.service';

import { User, UserDocument } from './schemas/user.schema';

import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  async create(createUserDto: CreateUserDto) {
    let user = await this.findOne(createUserDto.username);

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
    const user = await this.findOne(loginUserDto.username);

    return this.authService.login(user);
  }

  async profile(username: string) {
    const user = await this.findOne(username);

    return {
      id: user.id,
      username: user.username,
    };
  }
}
