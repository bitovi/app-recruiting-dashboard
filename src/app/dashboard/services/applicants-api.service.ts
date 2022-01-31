import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApplicantResponse } from '../../core/interfaces';

@Injectable()
export class ApplicantService {
  private applicantsApiURL = `${environment.api}/applicants`;

  constructor(private http: HttpClient) {}

  public getApplicants(params: HttpParams): Observable<ApplicantResponse> {
    return this.http.get<ApplicantResponse>(this.applicantsApiURL, { params });
  }
}
