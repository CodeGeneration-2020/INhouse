import { ApiService } from './types';

export interface TrackOptions {
  service: ApiService;
  method: string;
}

export interface GetCountApiCallsOptions {
  service: ApiService;
  method?: string;
}
