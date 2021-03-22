import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';

@Schema({
  versionKey: false,
})
export class HumanticRequestMetric {
  @Prop({
    type: SchemaTypes.String,
    index: true,
    required: true,
  })
  userId: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  profileAnalysisId: string;

  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  createdAt: Date;
}

export type HumanticRequestMetricDocument = HumanticRequestMetric & Document;

export const HumanticRequestMetricSchema = SchemaFactory.createForClass(
  HumanticRequestMetric,
);
