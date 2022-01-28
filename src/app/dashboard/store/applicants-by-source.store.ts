import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, Observable } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  finalize,
  map,
  tap,
} from 'rxjs/operators';
import { FilterStore } from './filter.store';
import {
  IApplicantsBySourceResponse,
  IDateFilter,
} from '../../core/interfaces';
import { ChartApiService } from '../services/charts-api.service';
import {
  WidgetFilterSelectStage,
  WidgetFilterUnion,
} from '../widgets/widget.model';
import { HttpHelperService } from '../services/http-helper.service';

export interface ApplicantsBySourceLoading {
  applicantsBySource: number;
}

export interface ApplicantsBySourceState {
  id: string;
  applicantsBySource: IApplicantsBySourceResponse[];
  loading: ApplicantsBySourceLoading;
  filter: IDateFilter;
}

@Injectable()
export class ApplicantsBySourceStore extends ComponentStore<ApplicantsBySourceState> {
  readonly loading$ = this.select(
    (state: ApplicantsBySourceState) => state.loading
  );
  readonly loadingApplicantsBySource$ = this.loading$.pipe(
    map(
      (loading: ApplicantsBySourceLoading) => loading.applicantsBySource !== 0
    )
  );
  public readonly id$ = this.select((state) => state.id);
  public readonly filters$: Observable<Map<string, WidgetFilterUnion>> =
    combineLatest([this.id$, this.filterStore.widgetFilters$]).pipe(
      map(([id, widgetFilters]) => widgetFilters?.get(id))
    );
  readonly filter$ = this.select(
    (state: ApplicantsBySourceState) => state.filter
  );
  readonly globalCombinedDates$ = this.filterStore.combinedDates$;
  readonly applicantsBySource$ = this.select(
    (state: ApplicantsBySourceState) => state.applicantsBySource
  );
  public readonly stageFilter$: Observable<string[]> = this.filters$.pipe(
    map(
      (filters) =>
        (filters?.get('select-stage') as WidgetFilterSelectStage)?.value
    ),
    distinctUntilChanged()
  );

  private readonly fetchApplicantsBySourceData$ = this.select(
    this.filter$,
    this.globalCombinedDates$,
    this.stageFilter$,
    (filter, globalCombinedDates, stageFilter) => ({
      filter,
      globalCombinedDates,
      stageFilter,
    }),
    { debounce: true }
  );

  constructor(
    private chartApiService: ChartApiService,
    private filterStore: FilterStore,
    private httpHelperService: HttpHelperService
  ) {
    super({
      id: '',
      applicantsBySource: [],
      loading: {
        applicantsBySource: 0,
      },
      filter: { startDate: null, endDate: null },
    });

    this.fetchApplicantsBySource(this.fetchApplicantsBySourceData$);
  }

  readonly setId = this.updater(
    (state, id: string): ApplicantsBySourceState => ({
      ...state,
      id,
    })
  );

  readonly setFilter = this.updater(
    (state, filter: IDateFilter): ApplicantsBySourceState => ({
      ...state,
      filter,
    })
  );

  private readonly updateLoading = this.updater(
    (
      state,
      loadingState: { key: keyof ApplicantsBySourceLoading; loading: boolean }
    ): ApplicantsBySourceState => ({
      ...state,
      loading: {
        ...state.loading,
        [loadingState.key]: loadingState.loading
          ? state.loading[loadingState.key] + 1
          : state.loading[loadingState.key] - 1,
      },
    })
  );

  private readonly updateApplicantsBySource = this.updater(
    (
      state,
      applicantsBySource: IApplicantsBySourceResponse[]
    ): ApplicantsBySourceState => ({
      ...state,
      applicantsBySource,
    })
  );

  private readonly fetchApplicantsBySource = this.effect(
    (
      data$: Observable<{
        filter: IDateFilter;
        globalCombinedDates: [Date, Date];
        stageFilter: string[];
      }>
    ) => {
      return data$.pipe(
        concatMap(({ filter, globalCombinedDates, stageFilter }) => {
          const params: HttpParams = this.httpHelperService.getHttpParams({
            startDate: filter.startDate
              ? filter.startDate
              : globalCombinedDates[0],
            endDate: filter.endDate ? filter.endDate : globalCombinedDates[1],
            stage: stageFilter,
          });
          this.updateLoading({ key: 'applicantsBySource', loading: true });

          return this.chartApiService.getApplicantsBySource(params).pipe(
            tap((result: IApplicantsBySourceResponse[]) =>
              this.updateApplicantsBySource(result)
            ),
            finalize(() =>
              this.updateLoading({
                key: 'applicantsBySource',
                loading: false,
              })
            )
          );
        })
      );
    }
  );
}
