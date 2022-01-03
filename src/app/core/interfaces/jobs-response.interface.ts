import { Job } from '.';

export interface IJobResponse {
  total: number;
  limit: number;
  skip: number;
  data: Job[];
}
