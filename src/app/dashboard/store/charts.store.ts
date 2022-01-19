import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, Observable, of } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  finalize,
  map,
  tap,
} from 'rxjs/operators';
import { FilterStore } from './filter.store';
import {
  IDateFilter,
  IJobsApplicantsResponse,
  INewApplicantsResponse,
  IRecruitingStageExitedResponse,
} from '../../core/interfaces';
import { ChartApiService } from '../services/charts-api.service';
import {
  WidgetFilterSelectStage,
  WidgetFilterUnion,
} from '../widgets/widget.model';

export interface ChartLoading {
  recruitingStageExited: number;
  newApplicants: number;
  jobsApplicants: number;
  stages: number;
}

export interface ChartsState {
  id: string;
  recruitingStageExited: IRecruitingStageExitedResponse[];
  newApplicants: INewApplicantsResponse[];
  jobsApplicants: IJobsApplicantsResponse[];
  stages: string[];
  loading: ChartLoading;
  filter: IDateFilter;
}

@Injectable()
export class ChartsStore extends ComponentStore<ChartsState> {
  readonly loading$ = this.select((state: ChartsState) => state.loading);
  readonly loadingRecruitingStageExited$ = this.loading$.pipe(
    map((loading: ChartLoading) => loading.recruitingStageExited !== 0)
  );
  readonly loadingNewApplicants$ = this.loading$.pipe(
    map((loading: ChartLoading) => loading.newApplicants !== 0)
  );
  readonly loadingJobsApplicants$ = this.loading$.pipe(
    map((loading: ChartLoading) => loading.jobsApplicants !== 0)
  );
  readonly loadingStages$ = this.loading$.pipe(
    map((loading: ChartLoading) => loading.stages !== 0)
  );
  public readonly id$ = this.select((state) => state.id);
  public readonly filters$: Observable<Map<string, WidgetFilterUnion>> =
    combineLatest([this.id$, this.filterStore.widgetFilters$]).pipe(
      map(([id, widgetFilters]) => widgetFilters?.get(id))
    );
  readonly filter$ = this.select((state: ChartsState) => state.filter);
  readonly globalCombinedDates$ = this.filterStore.combinedDates$;
  readonly recruitingStageExited$ = this.select(
    (state: ChartsState) => state.recruitingStageExited
  );
  readonly newApplicants$ = this.select(
    (state: ChartsState) => state.newApplicants
  );
  readonly jobsApplicants$ = this.select(
    (state: ChartsState) => state.jobsApplicants
  );
  readonly stages$ = this.select((state: ChartsState) => state.stages);
  public readonly stageFilter$: Observable<string[]> = this.filters$.pipe(
    map(
      (filters) =>
        (filters?.get('select-stage') as WidgetFilterSelectStage)?.value
    ),
    distinctUntilChanged()
  );

  private readonly fetchChartsData$ = this.select(
    this.filter$,
    this.globalCombinedDates$,
    (filter, globalCombinedDates) => ({
      filter,
      globalCombinedDates,
    }),
    { debounce: true }
  );

  constructor(
    private chartApiService: ChartApiService,
    private filterStore: FilterStore
  ) {
    super({
      id: '',
      recruitingStageExited: [],
      newApplicants: [],
      jobsApplicants: [],
      stages: [],
      loading: {
        recruitingStageExited: 0,
        newApplicants: 0,
        jobsApplicants: 0,
        stages: 0,
      },
      filter: { startDate: null, endDate: null },
    });

    this.fetchRecruitingStageExited(this.fetchChartsData$);
    this.fetchNewApplicants(this.fetchChartsData$);
    this.fetchJobsApplicants(this.fetchChartsData$);
    this.fetchStages();
  }

  readonly setId = this.updater(
    (state, id: string): ChartsState => ({
      ...state,
      id,
    })
  );

  readonly setFilter = this.updater(
    (state, filter: IDateFilter): ChartsState => ({
      ...state,
      filter,
    })
  );

  private readonly updateLoading = this.updater(
    (
      state,
      loadingState: { key: keyof ChartLoading; loading: boolean }
    ): ChartsState => ({
      ...state,
      loading: {
        ...state.loading,
        [loadingState.key]: loadingState.loading
          ? state.loading[loadingState.key] + 1
          : state.loading[loadingState.key] - 1,
      },
    })
  );

  private readonly updateRecruitingStageExited = this.updater(
    (
      state,
      recruitingStageExited: IRecruitingStageExitedResponse[]
    ): ChartsState => ({
      ...state,
      recruitingStageExited,
    })
  );

  private readonly updateNewApplicants = this.updater(
    (state, newApplicants: INewApplicantsResponse[]): ChartsState => ({
      ...state,
      newApplicants,
    })
  );

  private readonly updateJobsApplicants = this.updater(
    (state, jobsApplicants: IJobsApplicantsResponse[]): ChartsState => ({
      ...state,
      jobsApplicants,
    })
  );

  private readonly updateStages = this.updater(
    (state, stages: string[]): ChartsState => ({
      ...state,
      stages,
    })
  );

  private readonly fetchRecruitingStageExited = this.effect(
    (
      data$: Observable<{
        filter: IDateFilter;
        globalCombinedDates: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(({ filter, globalCombinedDates }) => {
          const params: HttpParams = this.chartApiService.getHttpParams(
            filter,
            globalCombinedDates
          );

          this.updateLoading({ key: 'recruitingStageExited', loading: true });

          return this.chartApiService.getRecruitingStageExited(params).pipe(
            tap((result: IRecruitingStageExitedResponse[]) => {
              this.updateRecruitingStageExited(result);
            }),
            finalize(() =>
              this.updateLoading({
                key: 'recruitingStageExited',
                loading: false,
              })
            )
          );
        })
      );
    }
  );

  private readonly fetchNewApplicants = this.effect(
    (
      data$: Observable<{
        filter: IDateFilter;
        globalCombinedDates: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(({ filter, globalCombinedDates }) => {
          const params: HttpParams = this.chartApiService.getHttpParams(
            filter,
            globalCombinedDates
          );
          this.updateLoading({ key: 'newApplicants', loading: true });

          return this.chartApiService.getNewApplicants(params).pipe(
            tap((result: INewApplicantsResponse[]) =>
              this.updateNewApplicants(result)
            ),
            finalize(() =>
              this.updateLoading({
                key: 'newApplicants',
                loading: false,
              })
            )
          );
        })
      );
    }
  );

  private readonly fetchJobsApplicants = this.effect(
    (
      data$: Observable<{
        filter: IDateFilter;
        globalCombinedDates: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(({ filter, globalCombinedDates }) => {
          const params: HttpParams = this.chartApiService.getHttpParams(
            filter,
            globalCombinedDates
          );
          this.updateLoading({ key: 'jobsApplicants', loading: true });

          return this.chartApiService.getApplicantJobs(params).pipe(
            tap((result: IJobsApplicantsResponse[]) =>
              this.updateJobsApplicants(result)
            ),
            finalize(() =>
              this.updateLoading({
                key: 'jobsApplicants',
                loading: false,
              })
            )
          );
        })
      );
    }
  );

  private readonly fetchStages = this.effect(() => {
    return of(true).pipe(
      concatMap(() => {
        this.updateLoading({ key: 'stages', loading: true });

        return this.chartApiService.getStages().pipe(
          tap((result: string[]) => this.updateStages(result)),
          finalize(() =>
            this.updateLoading({
              key: 'stages',
              loading: false,
            })
          )
        );
      })
    );
  });
}
