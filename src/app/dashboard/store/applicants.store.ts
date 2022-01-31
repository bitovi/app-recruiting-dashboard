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
import { Applicant, IDateFilter } from '../../core/interfaces';
import {
  WidgetFilter,
  WidgetFilterInputText,
  WidgetFilterSelectJob,
  WidgetFilterSelectSource,
  WidgetFilterSelectStage,
  WidgetFilterUnion,
} from '../widgets/widget.model';
import { ApplicantService } from '../services/applicants-api.service';
import { FilterStore } from './filter.store';
import { HttpHelperService } from '../services/http-helper.service';

export interface ApplicantsState {
  id: string;
  applicants: Applicant[];
  loadingCounter: number;
  currentPage: number;
  pageSize: number;
  totalApplicants: number;
  sort: INglDatatableSort;
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
  public readonly id$ = this.select((state) => state.id);
  public readonly filters$: Observable<Map<string, WidgetFilterUnion>> =
    combineLatest([this.id$, this.filterStore.widgetFilters$]).pipe(
      map(([id, widgetFilters]) => widgetFilters?.get(id))
    );
  public readonly dateFilters$: Observable<[Date, Date]> = combineLatest([
    this.filters$,
    this.filterStore.combinedDates$,
  ]).pipe(
    map(([filters, globalDates]) => {
      const filter = filters?.get('date-interval') as WidgetFilter<IDateFilter>;
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
  public readonly positionFilter$: Observable<string[]> = this.filters$.pipe(
    map(
      (filters) => (filters?.get('select-job') as WidgetFilterSelectJob)?.value
    ),
    distinctUntilChanged()
  );
  public readonly stageFilter$: Observable<string[]> = this.filters$.pipe(
    map(
      (filters) =>
        (filters?.get('select-stage') as WidgetFilterSelectStage)?.value
    ),
    distinctUntilChanged()
  );
  public readonly sourceFilter$: Observable<string[]> = this.filters$.pipe(
    map(
      (filters) =>
        (filters?.get('select-source') as WidgetFilterSelectSource)?.value
    )
  );
  public readonly applicantNameFilter$: Observable<string> = this.filters$.pipe(
    map(
      (filters) => (filters?.get('input-text') as WidgetFilterInputText)?.value
    ),
    distinctUntilChanged()
  );
  public readonly daysInactiveFilter$: Observable<number> = this.filters$.pipe(
    map(
      (filters) =>
        (filters?.get('input-text-days-inactive') as WidgetFilterInputText)
          ?.value
    ),
    distinctUntilChanged(),
    map((daysInactive) => parseInt(daysInactive))
  );

  private readonly fetchApplicantsData$ = this.select(
    this.pageSize$,
    this.currentPage$,
    this.sort$,
    this.positionFilter$,
    this.stageFilter$,
    this.dateFilters$,
    this.applicantNameFilter$,
    this.sourceFilter$,
    this.daysInactiveFilter$,
    (
      pageSize,
      currentPage,
      sort,
      positionFilter,
      stageFilter,
      dateFilters,
      applicantNameFilter,
      sourceFilter,
      daysInactiveFilter
    ) => ({
      pageSize,
      currentPage,
      sort,
      positionFilter,
      stageFilter,
      dateFilters,
      applicantNameFilter,
      sourceFilter,
      daysInactiveFilter,
    }),
    { debounce: true }
  );

  constructor(
    private applicantService: ApplicantService,
    private httpHelperService: HttpHelperService,
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
        positionFilter: string[];
        stageFilter: string[];
        dateFilters: [Date, Date];
        applicantNameFilter: string;
        sourceFilter: string[];
        daysInactiveFilter: number;
      }>
    ) => {
      return data$.pipe(
        concatMap(
          ({
            pageSize,
            currentPage,
            sort,
            positionFilter,
            stageFilter,
            dateFilters,
            applicantNameFilter,
            sourceFilter,
            daysInactiveFilter,
          }) => {
            const params: HttpParams = this.httpHelperService.getHttpParams({
              pageSize,
              currentPage,
              sort,
              position: positionFilter,
              stage: stageFilter,
              startDate: dateFilters[0],
              endDate: dateFilters[1],
              applicantName: applicantNameFilter,
              daysInactive: daysInactiveFilter,
              source: sourceFilter,
            });

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
