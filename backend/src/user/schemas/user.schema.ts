import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  hash as bcryptHash,
  genSalt as bcryptGenSalt,
  compare as bcryptCompare,
} from 'bcrypt';

import { Document, SchemaTypes } from 'mongoose';
import { Type, Expose, Exclude } from 'class-transformer';

@Schema({
  versionKey: false,
})
export class User {
  @Type(() => String)
  @Expose({
    name: '_id',
  })
  id: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    index: true,
    unique: true,
    required: true,
  })
  @Expose()
  username: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose()
  customerName: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose()
  contactName: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose()
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
