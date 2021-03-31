import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, Scope } from '@nestjs/common';

import { Model, FilterQuery, PopulateOptions } from 'mongoose';

import {
  TracApiOptions,
  GetCountApiCallsOptions,
  TrackHumanticRequestOptions,
  GetHumanticRequestsOptions,
  TrackRecognizeOptions,
  GetAllRecognizedOptions,
} from './metric.service.types';

import {
  ApiCallMetric,
  ApiCallMetricDocument,
} from './schemas/api-call-metric.schema';

import {
  HumanticRequestMetric,
  HumanticRequestMetricDocument,
} from './schemas/humantic-request-metric.schema';

import {
  RecognizeMetric,
  RecognizeMetricDocument,
} from './schemas/recognize-metric.schema';

import { Request } from '../shared/types';

@Injectable({
  scope: Scope.REQUEST,
})
export class MetricService {
  constructor(
    @Inject(REQUEST)
    private request: Request,

    @InjectModel(ApiCallMetric.name)
    private apiCallMetricModel: Model<ApiCallMetricDocument>,

    @InjectModel(HumanticRequestMetric.name)
    private humanticRequestMetricModel: Model<HumanticRequestMetricDocument>,

    @InjectModel(RecognizeMetric.name)
    private recognizeMetricModel: Model<RecognizeMetricDocument>,
  ) {}

  trackApiCall({ service, method }: TracApiOptions) {
    return this.apiCallMetricModel.create({ service, method });
  }

  getCountApiCalls({ service, method }: GetCountApiCallsOptions) {
    const filter: FilterQuery<ApiCallMetricDocument> = { service };

    if (method !== undefined) {
      filter.method = method;
    }

    return this.apiCallMetricModel.countDocuments(filter);
  }

  async trackHumanticRequest({
    userId = this.request.user.id,
    profileAnalysisId,
  }: TrackHumanticRequestOptions) {
    // TODO: use findOneAndUpdate with { insert: true } option
    let request = await this.humanticRequestMetricModel.findOne({
      userId,
      profileAnalysisId,
    });

    if (!request) {
      request = await this.humanticRequestMetricModel.create({
        userId,
        profileAnalysisId,
      });
    }

    return request;
  }

  getHumanticRequests({ userId }: GetHumanticRequestsOptions) {
    return this.humanticRequestMetricModel.find({ userId });
  }

  trackRecognize(options: TrackRecognizeOptions) {
    const userId = options.userId ?? this.request.user.id;

    return this.recognizeMetricModel.create({
      user: userId,
      fileId: options.fileId,
      text: options.text,
    });
  }

  async getAllRecognized({ search, paginate }: GetAllRecognizedOptions) {
    // TODO: use aggregate for find by username
    const query = this.recognizeMetricModel.find();

    const populate: PopulateOptions = {
      path: 'user',
    };

    if (search) {
      populate.match = {
        username: new RegExp(search.username, 'i'),
      };
    }

    query.populate(populate);

    if (paginate) {
      query.limit(paginate.limit);
      query.skip(paginate.offset);
    }

    query.lean();

    const responses = await query.exec();

    return responses.filter(({ user }) => Boolean(user));
  }
}
