import { Job } from './jazz-api.model';

export interface JobResponse {
  total: number;
  limit: number;
  skip: number;
  data: Job[];
}
