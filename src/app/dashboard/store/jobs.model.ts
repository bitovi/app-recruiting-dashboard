import { Job } from '../../core/interfaces';

export interface JobResponse {
  total: number;
  limit: number;
  skip: number;
  data: Job[];
}
