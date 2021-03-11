import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { v4 } from 'uuid';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({
    type: String,
    default: v4,
  })
  id: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
