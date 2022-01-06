import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { INglDatatableSort } from 'ng-lightning';
import { combineLatest, Observable } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  finalize,
  map,
  tap,
} from 'rxjs/operators';
import {
  Applicant,
  ApplicantFilterState,
  IDateFilter,
} from '../../core/interfaces';
import { WidgetFilter } from '../dashboard-widget/widget.model';
import { ApplicantService } from '../services/applicants-api.service';
import { FilterStore } from './filter.store';

export interface ApplicantsState {
  id: string;
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
  public readonly dateFilters$: Observable<[Date, Date]> = combineLatest([
    this.select((state) => state.id),
    this.filterStore.widgetFilters$,
    this.filterStore.combinedDates$,
  ]).pipe(
    map(([id, widgetFilters, globalDates]) => {
      const filter = widgetFilters
        ?.get(id)
        ?.get('date-interval') as WidgetFilter<IDateFilter>;
      const startDate = filter?.value.startDate || globalDates[0];
      const endDate = filter?.value.endDate || globalDates[1];

      return [startDate, endDate] as [Date, Date];
    }),
    // we don't want observable to emit when date filters have reference changes but no value change
    distinctUntilChanged(
      ([startDate1, endDate1], [startDate2, endDate2]) =>
        startDate1.getTime() === startDate2.getTime() &&
        endDate1.getTime() === endDate2.getTime()
    )
  );

  private readonly fetchApplicantsData$ = this.select(
    this.pageSize$,
    this.currentPage$,
    this.sort$,
    this.filters$,
    this.dateFilters$,
    (pageSize, currentPage, sort, filters, dateFilters) => ({
      pageSize,
      currentPage,
      sort,
      filters,
      dateFilters,
    }),
    { debounce: true }
  );

  constructor(
    private applicantService: ApplicantService,
    private filterStore: FilterStore
  ) {
    super({
      id: '',
      applicants: [],
      loadingCounter: 0,
      currentPage: 1,
      pageSize: 10,
      totalApplicants: 0,
      sort: { key: '', order: 'desc' },
      filters: { position: [] },
    });

    this.fetchApplicants(this.fetchApplicantsData$);
  }

  readonly setId = this.updater(
    (state, id: string): ApplicantsState => ({
      ...state,
      id,
    })
  );

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
        dateFilters: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(({ pageSize, currentPage, sort, filters, dateFilters }) => {
          const params: HttpParams = this.applicantService.getHttpParams(
            pageSize,
            currentPage,
            sort,
            filters,
            dateFilters
          );

          this.updateLoading(true);

          return this.applicantService.getApplicants(params).pipe(
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
