import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';
import { Type, Expose, Exclude } from 'class-transformer';

@Schema({
  versionKey: false,
})
export class User {
  @Type(() => String)
  @Expose({
    name: '_id',
    groups: ['admin'],
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
    groups: ['admin'],
  })
  username: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose({
    groups: ['admin'],
  })
  customerName: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose({
    groups: ['admin'],
  })
  contactName: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
  })
  @Expose({
    groups: ['admin'],
  })
  email: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @Exclude()
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
