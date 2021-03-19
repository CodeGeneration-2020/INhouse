import { ApiService } from './types';

export interface TrackOptions {
  service: ApiService;
  method: string;
}

export interface GetApiCallOptions {
  service: ApiService;
  method?: string;
}
