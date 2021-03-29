import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Type, Expose } from 'class-transformer';
import { Document, SchemaTypes } from 'mongoose';

import { User } from '../../user/schemas/user.schema';

@Schema({
  versionKey: false,
})
export class RecognizeMetric {
  @Type(() => String)
  @Expose({
    name: '_id',
    groups: ['admin'],
  })
  id: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @Expose({
    groups: ['admin'],
  })
  fileId: string;

  @Type(() => User)
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    required: true,
  })
  @Expose({
    groups: ['admin'],
  })
  user: User;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @Expose({
    groups: ['admin'],
  })
  text: string;

  @Type(() => Date)
  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  @Expose({
    groups: ['admin'],
  })
  createdAt: Date;
}

export type RecognizeMetricDocument = RecognizeMetric & Document;

export const RecognizeMetricSchema = SchemaFactory.createForClass(
  RecognizeMetric,
);
