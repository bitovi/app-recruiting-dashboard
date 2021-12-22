import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { INglDatatableSort } from 'ng-lightning';
import { Observable } from 'rxjs';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicantResponse } from './applicant.model';
import { Applicant } from './jazz-api.model';

export interface ApplicantsState {
  applicants: Applicant[];
  loadingCounter: number;
  currentPage: number;
  pageSize: number;
  totalApplicants: number;
  sort: INglDatatableSort;
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

  private readonly fetchApplicantsData$ = this.select(
    this.pageSize$,
    this.currentPage$,
    this.sort$,
    (pageSize, currentPage, sort) => ({ pageSize, currentPage, sort }),
    { debounce: true }
  );

  constructor(private http: HttpClient) {
    super({
      applicants: [],
      loadingCounter: 0,
      currentPage: 1,
      pageSize: 10,
      totalApplicants: 0,
      sort: { key: '', order: 'desc' },
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

  private readonly fetchApplicants = this.effect(
    (
      data$: Observable<{
        pageSize: number;
        currentPage: number;
        sort: INglDatatableSort;
      }>
    ) => {
      return data$.pipe(
        concatMap(({ pageSize, currentPage, sort }) => {
          const url = `${environment.api}/applicants`;
          let params = new HttpParams()
            .set('$limit', pageSize)
            .set('$skip', currentPage * pageSize - pageSize);

          if (sort.key.length) {
            params = params.set(
              `$sort[${sort.key}]`,
              sort.order === 'asc' ? 1 : -1
            );
          }

          this.updateLoading(true);

          return this.http.get<ApplicantResponse>(url, { params }).pipe(
            tap((result) => {
              this.updateApplicants(result.data);
              this.updateTotalApplicants(result.total);
            }),
            finalize(() => this.updateLoading(false))
          );
        })
      );
    }
  );
}
