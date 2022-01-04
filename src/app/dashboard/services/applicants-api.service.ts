import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApplicantFilterState, ApplicantResponse } from '../../core/interfaces';

@Injectable()
export class ApplicantService {
  private applicantsApiURL = `${environment.api}/applicants`;

  constructor(private http: HttpClient) {}

  public getApplicants(params: HttpParams): Observable<ApplicantResponse> {
    return this.http.get<ApplicantResponse>(this.applicantsApiURL, { params });
  }
  public getHttpParams(
    pageSize: number,
    currentPage: number,
    sort: INglDatatableSort,
    filters: ApplicantFilterState,
    globalCombinedDates: [Date, Date]
  ): HttpParams {
    const [globalStartDate, globalEndDate] = globalCombinedDates;
    const { startDate, endDate } = filters.date;
    const position = filters.position;

    let params = new HttpParams()
      .set('$limit', pageSize)
      .set('$skip', currentPage * pageSize - pageSize)
      .set(
        'apply_date_date[$gte]',
        startDate ? startDate.toISOString() : globalStartDate.toISOString()
      )
      .set(
        'apply_date_date[$lte]',
        endDate ? endDate.toISOString() : globalEndDate.toISOString()
      );

    if (sort.key.length) {
      params = params.set(`$sort[${sort.key}]`, sort.order === 'asc' ? 1 : -1);
    }

    if (position.length) {
      position.forEach((pos) => {
        params = params.append(`jobs.job_title[$in][]`, pos);
      });
    }

    return params;
  }
}
