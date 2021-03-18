import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MetricService } from './metric.service';

import {
  ApiCallMetric,
  ApiCallMetricSchema,
} from './schemas/api-call-metric.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ApiCallMetric.name,
        schema: ApiCallMetricSchema,
      },
    ]),
  ],
  providers: [MetricService],
  exports: [MetricService],
})
export class MetricModule {}
