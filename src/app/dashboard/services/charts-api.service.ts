import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IApplicantsBySourceResponse,
  IJobsApplicantsResponse,
  INewApplicantsResponse,
  IRecruitingStageExitedResponse,
} from '../../core/interfaces';

@Injectable()
export class ChartApiService {
  constructor(private http: HttpClient) {}

  public getRecruitingStageExited(
    params: HttpParams
  ): Observable<IRecruitingStageExitedResponse[]> {
    return this.http.get<IRecruitingStageExitedResponse[]>(
      `${environment.api}/charts/recruiting-stage-exit`,
      { params }
    );
  }

  public getNewApplicants(
    params: HttpParams
  ): Observable<INewApplicantsResponse[]> {
    return this.http.get<INewApplicantsResponse[]>(
      `${environment.api}/charts/applicants`,
      { params }
    );
  }

  public getApplicantsBySource(
    params: HttpParams
  ): Observable<IApplicantsBySourceResponse[]> {
    return this.http.get<IApplicantsBySourceResponse[]>(
      `${environment.api}/charts/applicants-by-source`,
      { params }
    );
  }

  public getApplicantJobs(
    params: HttpParams
  ): Observable<IJobsApplicantsResponse[]> {
    return this.http.get<IJobsApplicantsResponse[]>(
      `${environment.api}/charts/jobs`,
      { params }
    );
  }

  public getStages(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.api}/charts/stages`);
  }

  public getSources(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.api}/charts/sources`);
  }
}
