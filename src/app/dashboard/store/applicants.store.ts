import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { INglDatatableSort } from 'ng-lightning';
import { Observable } from 'rxjs';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { Applicant, ApplicantFilterState } from '../../core/interfaces';
import { ApplicantService } from '../services/applicants-api.service';
import { FilterStore } from './filter.store';

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
  public readonly applicants$: Observable<Applicant[]> = this.select(
    (state) => state.applicants
  );
  public readonly loading$: Observable<boolean> = this.select(
    (state) => state.loadingCounter
  ).pipe(map((counter) => counter !== 0));
  public readonly pageSize$ = this.select((state) => state.pageSize);
  public readonly currentPage$ = this.select((state) => state.currentPage);
  public readonly totalApplicants$ = this.select(
    (state) => state.totalApplicants
  );
  public readonly sort$ = this.select((state) => state.sort);
  public readonly filters$ = this.select((state) => state.filters);
  public readonly globalCombinedDates$ = this.filterStore.combinedDates$;

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

  constructor(
    private applicantService: ApplicantService,
    private filterStore: FilterStore
  ) {
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

  readonly setPage = this.updater(
    (state, currentPage: number): ApplicantsState => ({
      ...state,
      currentPage,
    })
  );

  readonly setSort = this.updater(
    (state, sort: INglDatatableSort): ApplicantsState => ({
      ...state,
      sort,
    })
  );

  readonly setFilter = this.updater(
    (state, filters: Partial<ApplicantFilterState>): ApplicantsState => ({
      ...state,
      filters: {
        ...state.filters,
        ...filters,
      },
    })
  );

  private readonly updateLoading = this.updater(
    (state, loading: boolean): ApplicantsState => ({
      ...state,
      loadingCounter: loading
        ? state.loadingCounter + 1
        : state.loadingCounter - 1,
    })
  );

  private readonly updateApplicants = this.updater(
    (state, applicants: Applicant[]): ApplicantsState => ({
      ...state,
      applicants,
    })
  );

  private readonly updateTotalApplicants = this.updater(
    (state, totalApplicants: number): ApplicantsState => ({
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
        filters: ApplicantFilterState;
        globalCombinedDates: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(
          ({ pageSize, currentPage, sort, filters, globalCombinedDates }) => {
            const params: HttpParams = this.applicantService.getHttpParams(
              pageSize,
              currentPage,
              sort,
              filters,
              globalCombinedDates
            );

            this.updateLoading(true);

            return this.applicantService.getApplicants(params).pipe(
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
