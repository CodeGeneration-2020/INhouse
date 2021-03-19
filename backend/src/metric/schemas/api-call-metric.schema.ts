import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';

import { ApiService } from '../types';

@Schema({
  versionKey: false,
})
export class ApiCallMetric {
  @Prop({
    type: SchemaTypes.String,
    enum: ApiService,
    required: true,
  })
  service: ApiService;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  method: string;

  @Prop({
    type: SchemaTypes.Date,
    default: () => Date.now(),
  })
  callTime: Date;
}

export type ApiCallMetricDocument = ApiCallMetric & Document;

export const ApiCallMetricSchema = SchemaFactory.createForClass(ApiCallMetric);
