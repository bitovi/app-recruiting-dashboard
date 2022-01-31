import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { INglDatatableSort } from 'ng-lightning';

export interface RecruitingDashboardHttpParams {
  // pagination
  pageSize?: number;
  currentPage?: number;
  sort?: INglDatatableSort;

  // job position
  position?: string[];

  // stage
  stage?: string[];

  // date interval
  startDate?: Date;
  endDate?: Date;

  // applicant name
  applicantName?: string;

  // applicant's inactivity in days
  daysInactive?: number;
}

@Injectable({ providedIn: 'root' })
export class HttpHelperService {
  public getHttpParams(httpParams: RecruitingDashboardHttpParams): HttpParams {
    let params = new HttpParams();

    if (httpParams.pageSize) {
      params = params.set('$limit', httpParams.pageSize);
    }

    if (httpParams.currentPage) {
      params = params.set(
        '$skip',
        httpParams.currentPage * httpParams.pageSize - httpParams.pageSize
      );
    }

    if (httpParams.startDate) {
      params = params.set(
        'apply_date_date[$gte]',
        httpParams.startDate.toISOString()
      );
    }
    if (httpParams.endDate) {
      params = params.set(
        'apply_date_date[$lte]',
        httpParams.endDate.toISOString()
      );
    }

    if (httpParams.sort?.key.length) {
      params = params.set(
        `$sort[${httpParams.sort.key}]`,
        httpParams.sort.order === 'asc' ? 1 : -1
      );
    }

    if (httpParams.position?.length) {
      httpParams.position.forEach((pos) => {
        params = params.append(`jobs.job_title[$in][]`, pos);
      });
    }

    if (httpParams.stage?.length) {
      httpParams.stage.forEach((pos) => {
        params = params.append(`jobs.applicant_progress[$in][]`, pos);
      });
    }

    if (httpParams.applicantName?.length) {
      params = params.set('full_name[$search]', `${httpParams.applicantName}`);
    }

    if (httpParams.daysInactive) {
      const lastActivityDate: Date = this.getDateMinusDays(
        new Date(),
        httpParams.daysInactive
      );
      params = params.set(
        'last_activity_date[$lt]',
        lastActivityDate.toISOString()
      );
    }

    return params;
  }

  private getDateMinusDays(date: Date, days: number): Date {
    return moment(date).subtract(days, 'days').startOf('day').toDate();
  }
}
