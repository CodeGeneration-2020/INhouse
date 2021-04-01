import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Type, Expose } from 'class-transformer';
import { Document, SchemaTypes } from 'mongoose';

import { User } from 'src/user/schemas/user.schema';

import { Role } from 'src/shared/role.enum';

@Schema({
  versionKey: false,
})
export class RecognizeMetric {
  @Type(() => String)
  @Expose({
    name: '_id',
    groups: [Role.ADMIN],
  })
  id: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @Expose({
    groups: [Role.ADMIN],
  })
  fileId: string;

  @Type(() => User)
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    required: true,
  })
  @Expose({
    groups: [Role.ADMIN],
  })
  user: User;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @Expose({
    groups: [Role.ADMIN],
  })
  text: string;

  @Type(() => Date)
  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  @Expose({
    groups: [Role.ADMIN],
  })
  createdAt: Date;
}

export type RecognizeMetricDocument = RecognizeMetric &
  Document<RecognizeMetric>;

export const RecognizeMetricSchema = SchemaFactory.createForClass(
  RecognizeMetric,
);
