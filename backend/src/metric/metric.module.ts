import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';

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
  controllers: [MetricController],
  providers: [MetricService],
  exports: [MetricService],
})
export class MetricModule {}
