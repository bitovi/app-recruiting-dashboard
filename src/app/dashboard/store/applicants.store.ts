import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { INglDatatableSort } from 'ng-lightning';
import { Observable } from 'rxjs';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ApplicantResponse,
  RecruitingStageExitedData,
} from './applicant.model';
import { FilterStore } from './filter.store';
import { Applicant } from './jazz-api.model';

export interface ApplicantsState {
  applicants: Applicant[];
  loadingCounter: number;
  currentPage: number;
  pageSize: number;
  totalApplicants: number;
  sort: INglDatatableSort;
  filter: ApplicantFilter;
}

export interface ApplicantFilter {
  startDate: Date | null;
  endDate: Date | null;
}

@Injectable()
export class ApplicantsStore extends ComponentStore<ApplicantsState> {
  readonly applicants$: Observable<Applicant[]> = this.select(
    (state) => state.applicants
  );
  readonly loading$: Observable<boolean> = this.select(
    (state) => state.loadingCounter
  ).pipe(map((counter) => counter !== 0));
  readonly pageSize$ = this.select((state) => state.pageSize);
  readonly currentPage$ = this.select((state) => state.currentPage);
  readonly totalApplicants$ = this.select((state) => state.totalApplicants);
  readonly sort$ = this.select((state) => state.sort);
  readonly filter$ = this.select((state) => state.filter);
  readonly globalCombinedDates$ = this.filterStore.combinedDates$;
  readonly recruitingStageExitedData$: Observable<RecruitingStageExitedData[]> =
    this.select((state) => state.applicants).pipe(
      map((applicants) => {
        const mapped = applicants.reduce(
          (prev: { [key: string]: number }, curr) => {
            const stage = curr.jobs
              ? curr.jobs[curr.jobs.length - 1].applicant_progress
              : 'No Job';
            const sum = prev[stage];
            return { ...prev, [stage]: sum >= 0 ? sum + 1 : 1 };
          },
          {}
        );
        return Object.entries(mapped).map(([key, value]) => ({
          stageTitle: key,
          applicantCount: value,
        }));
      })
    );

  private readonly fetchApplicantsData$ = this.select(
    this.pageSize$,
    this.currentPage$,
    this.sort$,
    this.filter$,
    this.globalCombinedDates$,
    (pageSize, currentPage, sort, filter, globalCombinedDates) => ({
      pageSize,
      currentPage,
      sort,
      filter,
      globalCombinedDates,
    }),
    { debounce: true }
  );

  constructor(private http: HttpClient, private filterStore: FilterStore) {
    super({
      applicants: [],
      loadingCounter: 0,
      currentPage: 1,
      pageSize: 10,
      totalApplicants: 0,
      sort: { key: '', order: 'desc' },
      filter: { startDate: null, endDate: null },
    });

    this.fetchApplicants(this.fetchApplicantsData$);
  }

  readonly setPage = this.updater((state, currentPage: number) => ({
    ...state,
    currentPage,
  }));

  readonly setSort = this.updater((state, sort: INglDatatableSort) => ({
    ...state,
    sort,
  }));

  readonly setFilter = this.updater((state, filter: ApplicantFilter) => ({
    ...state,
    filter,
  }));

  private readonly updateLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loadingCounter: loading
      ? state.loadingCounter + 1
      : state.loadingCounter - 1,
  }));

  private readonly updateApplicants = this.updater(
    (state, applicants: Applicant[]) => ({
      ...state,
      applicants,
    })
  );

  private readonly updateTotalApplicants = this.updater(
    (state, totalApplicants: number) => ({
      ...state,
      totalApplicants,
    })
  );

  private toISOString(date: Date) {
    var z = (n: number) => ('0' + n).slice(-2);
    var zz = (n: number) => ('00' + n).slice(-3);
    // var off = date.getTimezoneOffset();
    // var sign = off > 0 ? '-' : '+';
    // off = Math.abs(off);

    return (
      date.getFullYear() +
      '-' +
      z(date.getMonth() + 1) +
      '-' +
      z(date.getDate()) +
      'T' +
      z(date.getHours()) +
      ':' +
      z(date.getMinutes()) +
      ':' +
      z(date.getSeconds()) +
      '.' +
      zz(date.getMilliseconds()) +
      'Z'
      // sign +
      // z((off / 60) | 0) +
      // ':' +
      // z(off % 60)
    );
  }

  private getHttpParams(
    pageSize: number,
    currentPage: number,
    sort: INglDatatableSort,
    { startDate, endDate }: ApplicantFilter,
    globalCombinedDates: [Date, Date]
  ): HttpParams {
    const [globalStartDate, globalEndDate] = globalCombinedDates;

    let params = new HttpParams()
      .set('$limit', pageSize)
      .set('$skip', currentPage * pageSize - pageSize)
      .set(
        'apply_date_date[$gte]',
        startDate
          ? this.toISOString(startDate)
          : this.toISOString(globalStartDate)
      )
      .set(
        'apply_date_date[$lte]',
        endDate ? this.toISOString(endDate) : this.toISOString(globalEndDate)
      );

    if (sort.key.length) {
      params = params.set(`$sort[${sort.key}]`, sort.order === 'asc' ? 1 : -1);
    }

    return params;
  }

  private readonly fetchApplicants = this.effect(
    (
      data$: Observable<{
        pageSize: number;
        currentPage: number;
        sort: INglDatatableSort;
        filter: ApplicantFilter;
        globalCombinedDates: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(
          ({ pageSize, currentPage, sort, filter, globalCombinedDates }) => {
            const url = `${environment.api}/applicants`;
            const params = this.getHttpParams(
              pageSize,
              currentPage,
              sort,
              filter,
              globalCombinedDates
            );

            this.updateLoading(true);

            return this.http.get<ApplicantResponse>(url, { params }).pipe(
              tap((result) => {
                this.updateApplicants(result.data);
                this.updateTotalApplicants(result.total);
              }),
              finalize(() => this.updateLoading(false))
            );
          }
        )
      );
    }
  );
}
