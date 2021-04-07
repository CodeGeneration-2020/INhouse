import { ApiService } from './types';

import { User } from 'src/user/schemas/user.schema';
import { ProfileAnalysis } from 'src/humantic-ai/schemas/profile-analysis.schema';

import { PaginateOptions } from 'src/shared/dto/paginate.dto';

import { GetAllRecognizedSearchOptions } from './dto/get-all-recognized.dto';

export interface TrackApiOptions {
  service: ApiService;
  method: string;
}

export interface GetCountApiCallsOptions {
  service: ApiService;
  method?: string;
}

export interface TrackHumanticRequestOptions {
  user?: User;
  profileAnalysis: ProfileAnalysis;
}

export interface GetHumanticRequestsOptions {
  userId: string;
}

export interface TrackRecognizeOptions {
  userId?: string;
  fileId: string;
  text: string;
}

export interface GetAllRecognizedOptions {
  search?: GetAllRecognizedSearchOptions;
  paginate?: PaginateOptions;
}
