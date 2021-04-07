import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Type, Expose } from 'class-transformer';
import { Document, SchemaTypes } from 'mongoose';

import { User } from 'src/user/schemas/user.schema';
import { ProfileAnalysis } from 'src/humantic-ai/schemas/profile-analysis.schema';

@Schema({
  versionKey: false,
})
export class HumanticRequestMetric {
  @Type(() => User)
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    required: true,
  })
  @Expose()
  user: User;

  @Type(() => ProfileAnalysis)
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: ProfileAnalysis.name,
    required: true,
  })
  @Expose()
  profileAnalysis: ProfileAnalysis;

  @Type(() => Date)
  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  @Expose()
  createdAt: Date;
}

export type HumanticRequestMetricDocument = HumanticRequestMetric &
  Document<HumanticRequestMetric>;

export const HumanticRequestMetricSchema = SchemaFactory.createForClass(
  HumanticRequestMetric,
);
