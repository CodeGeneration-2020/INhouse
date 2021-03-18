import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { TrackOptions } from './metric.service.types';

import {
  ApiCallMetric,
  ApiCallMetricDocument,
} from './schemas/api-call-metric.schema';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(ApiCallMetric.name)
    private apiCallMetricModel: Model<ApiCallMetricDocument>,
  ) {}

  trackApiCall(options: TrackOptions) {
    return this.apiCallMetricModel.create({
      service: options.service,
      method: options.method,
    });
  }
}
