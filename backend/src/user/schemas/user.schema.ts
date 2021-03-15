import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { v4 } from 'uuid';
import { Document, SchemaTypes } from 'mongoose';

@Schema({
  versionKey: false,
})
export class User {
  @Prop({
    type: SchemaTypes.String,
    index: true,
    default: v4,
  })
  id: string;

  @Prop({
    type: SchemaTypes.String,
    index: true,
    unique: true,
    required: true,
  })
  username: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
