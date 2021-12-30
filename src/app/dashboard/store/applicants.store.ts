import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { INglDatatableSort } from 'ng-lightning';
import { Observable } from 'rxjs';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicantFilterState, ApplicantResponse } from './applicant.model';
import { FilterStore } from './filter.store';
import { Applicant } from './jazz-api.model';

export interface ApplicantsState {
  applicants: Applicant[];
  loadingCounter: number;
  currentPage: number;
  pageSize: number;
  totalApplicants: number;
  sort: INglDatatableSort;
  filters: ApplicantFilterState;
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
  readonly filters$ = this.select((state) => state.filters);
  readonly globalCombinedDates$ = this.filterStore.combinedDates$;

  private readonly fetchApplicantsData$ = this.select(
    this.pageSize$,
    this.currentPage$,
    this.sort$,
    this.filters$,
    this.globalCombinedDates$,
    (pageSize, currentPage, sort, filters, globalCombinedDates) => ({
      pageSize,
      currentPage,
      sort,
      filters,
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
      filters: { date: { startDate: null, endDate: null }, position: [] },
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

  readonly setFilter = this.updater(
    (state, filters: Partial<ApplicantFilterState>) => ({
      ...state,
      filters: {
        ...state.filters,
        ...filters,
      },
    })
  );

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

    if (position.length) {
      position.forEach((pos) => {
        params = params.append(`jobs.job_title[$in][]`, pos);
      });
    }

    return params;
  }

  private readonly fetchApplicants = this.effect(
    (
      data$: Observable<{
        pageSize: number;
        currentPage: number;
        sort: INglDatatableSort;
        filters: ApplicantFilterState;
        globalCombinedDates: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(
          ({ pageSize, currentPage, sort, filters, globalCombinedDates }) => {
            const url = `${environment.api}/applicants`;
            const params = this.getHttpParams(
              pageSize,
              currentPage,
              sort,
              filters,
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
