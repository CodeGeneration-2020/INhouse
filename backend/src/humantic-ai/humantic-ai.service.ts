import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable, HttpService } from '@nestjs/common';

import { Model } from 'mongoose';

import {
  ProfileAnalysis,
  ProfileAnalysisDocument,
} from './schemas/profile-analysis.schema';

import { GetAnalysisDto } from './dto/get-analysis.dto';

import { FetchAnalysisParams, CreateAnalysisParams } from './types';

import { cleanLinkedInUrl } from './helpers';

const baseUrl = 'https://api.humantic.ai/v1/';

@Injectable()
export class HumanticAiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,

    @InjectModel(ProfileAnalysis.name)
    private profileAnalysis: Model<ProfileAnalysisDocument>,
  ) {}

  private async createAnalysis(params: CreateAnalysisParams) {
    const url = `${baseUrl}/user-profile/create`;

    const apiKey = this.configService.get<string>('HUMANTIC_AI_API_KEY');

    const { data } = await this.httpService
      .get(url, {
        params: {
          apikey: apiKey,
          userid: params.userId,
        },
      })
      .toPromise();

    return data;
  }

  private async fetchAnalysis(params: FetchAnalysisParams) {
    const url = `${baseUrl}/user-profile`;

    const apiKey = this.configService.get<string>('HUMANTIC_AI_API_KEY');

    const { data } = await this.httpService
      .get(url, {
        params: {
          apikey: apiKey,
          userid: params.userId,
          persona: params.persona,
        },
      })
      .toPromise();

    return data;
  }

  async getAnalysis(getAnalysisDto: GetAnalysisDto) {
    const linkedInUrl = cleanLinkedInUrl(getAnalysisDto.linkedInUrl);

    let profileAnalysis = await this.profileAnalysis.findOne({
      linkedInUrl,
    });

    if (!profileAnalysis) {
      await this.createAnalysis({
        userId: linkedInUrl,
      });

      let response: any;

      do {
        response = await this.fetchAnalysis({
          userId: linkedInUrl,
        });
      } while (response.metadata.analysis_status === 'NOT_COMPLETE');

      profileAnalysis = await this.profileAnalysis.create({
        linkedInUrl,

        analysis: response.results,
      });
    }

    return profileAnalysis.analysis;
  }
}
