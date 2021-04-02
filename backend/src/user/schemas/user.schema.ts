import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  hash as bcryptHash,
  genSalt as bcryptGenSalt,
  compare as bcryptCompare,
} from 'bcrypt';

import { Role } from 'src/shared/role.enum';

import { Document, SchemaTypes } from 'mongoose';
import { Type, Expose, Exclude } from 'class-transformer';

@Schema({
  versionKey: false,
})
export class User {
  @Type(() => String)
  @Expose({
    name: '_id',
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  id: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    index: true,
    unique: true,
    required: true,
  })
  @Expose({
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  username: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    enum: Role,
    required: true,
  })
  @Expose({
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  role: Role;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose({
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  customerName: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose({
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  contactName: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose({
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  email: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @Exclude()
  password: string;

  comparePassword(password: string) {
    return bcryptCompare(password, this.password);
  }
}

export type UserDocument = User & Document<User>;

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    next();

    return;
  }

  const salt = await bcryptGenSalt();

  this.password = await bcryptHash(this.password, salt);

  next();
});

UserSchema.loadClass(User);

export { UserSchema };
