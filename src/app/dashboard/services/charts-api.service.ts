import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IApplicantsBySourceResponse,
  IDateFilter,
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

  public getHttpParams(
    { startDate, endDate }: IDateFilter,
    globalCombinedDates: [Date, Date]
  ): HttpParams {
    const [globalStartDate, globalEndDate] = globalCombinedDates;

    const params = new HttpParams()
      .set(
        'apply_date_date[$gte]',
        startDate ? startDate.toISOString() : globalStartDate.toISOString()
      )
      .set(
        'apply_date_date[$lte]',
        endDate ? endDate.toISOString() : globalEndDate.toISOString()
      );

    return params;
  }
}
