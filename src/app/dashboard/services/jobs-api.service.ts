import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IJobResponse } from '../../core/interfaces/jobs-response.interface';

@Injectable()
export class JobsApiService {
  private jobsApiUrl = `${environment.api}/jobs`;

  constructor(private http: HttpClient) {}

  public getJobs(params: HttpParams): Observable<IJobResponse> {
    return this.http.get<IJobResponse>(this.jobsApiUrl, { params });
  }

  public getHttpParams(): HttpParams {
    const params = new HttpParams().set('status', 'Open');

    return params;
  }
}
