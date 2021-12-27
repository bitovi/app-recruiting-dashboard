import { Applicant } from './jazz-api.model';

export interface ApplicantResponse {
  total: number;
  limit: number;
  skip: number;
  data: Applicant[];
}

export interface RecruitingStageExitedData {
  stageTitle: string;
  applicantCount: number;
}
