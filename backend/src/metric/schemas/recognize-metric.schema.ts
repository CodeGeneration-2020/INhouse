import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';

@Schema({
  versionKey: false,
})
export class RecognizeMetric {
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
  text: string;

  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  createdAt: Date;
}

export type RecognizeMetricDocument = RecognizeMetric & Document;

export const RecognizeMetricSchema = SchemaFactory.createForClass(
  RecognizeMetric,
);
