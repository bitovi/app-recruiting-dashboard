import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  NewApplicantsResponse,
  RecruitingStageExitedResponse,
} from './charts.model';
import { FilterStore } from './filter.store';
import { DateFilter } from './store.model';

export interface ChartLoading {
  recruitingStageExited: number;
  newApplicants: number;
}

export interface ChartsState {
  recruitingStageExited: RecruitingStageExitedResponse[];
  newApplicants: NewApplicantsResponse[];
  loading: ChartLoading;
  filter: DateFilter;
}

@Injectable()
export class ChartsStore extends ComponentStore<ChartsState> {
  readonly loading$ = this.select((state) => state.loading);
  readonly loadingRecruitingStageExited$ = this.loading$.pipe(
    map((loading) => loading.recruitingStageExited !== 0)
  );
  readonly loadingNewApplicants$ = this.loading$.pipe(
    map((loading) => loading.newApplicants !== 0)
  );
  readonly filter$ = this.select((state) => state.filter);
  readonly globalCombinedDates$ = this.filterStore.combinedDates$;
  readonly recruitingStageExited$ = this.select(
    (state) => state.recruitingStageExited
  );
  readonly newApplicants$ = this.select((state) => state.newApplicants);

  private readonly fetchChartsData$ = this.select(
    this.filter$,
    this.globalCombinedDates$,
    (filter, globalCombinedDates) => ({
      filter,
      globalCombinedDates,
    }),
    { debounce: true }
  );

  constructor(private http: HttpClient, private filterStore: FilterStore) {
    super({
      recruitingStageExited: [],
      newApplicants: [],
      loading: {
        recruitingStageExited: 0,
        newApplicants: 0,
      },
      filter: { startDate: null, endDate: null },
    });

    this.fetchRecruitingStageExited(this.fetchChartsData$);
    this.fetchNewApplicants(this.fetchChartsData$);
  }

  readonly setFilter = this.updater((state, filter: DateFilter) => ({
    ...state,
    filter,
  }));

  private readonly updateLoading = this.updater(
    (state, loadingState: { key: keyof ChartLoading; loading: boolean }) => ({
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
    (state, recruitingStageExited: RecruitingStageExitedResponse[]) => ({
      ...state,
      recruitingStageExited,
    })
  );

  private readonly updateNewApplicants = this.updater(
    (state, newApplicants: NewApplicantsResponse[]) => ({
      ...state,
      newApplicants,
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
    { startDate, endDate }: DateFilter,
    globalCombinedDates: [Date, Date]
  ): HttpParams {
    const [globalStartDate, globalEndDate] = globalCombinedDates;

    let params = new HttpParams()
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

    return params;
  }

  private readonly fetchRecruitingStageExited = this.effect(
    (
      data$: Observable<{
        filter: DateFilter;
        globalCombinedDates: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(({ filter, globalCombinedDates }) => {
          const url = `${environment.api}/charts/recruiting-stage-exit`;
          const params = this.getHttpParams(filter, globalCombinedDates);

          this.updateLoading({ key: 'recruitingStageExited', loading: true });

          return this.http
            .get<RecruitingStageExitedResponse[]>(url, { params })
            .pipe(
              tap((result) => this.updateRecruitingStageExited(result)),
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
        filter: DateFilter;
        globalCombinedDates: [Date, Date];
      }>
    ) => {
      return data$.pipe(
        concatMap(({ filter, globalCombinedDates }) => {
          const url = `${environment.api}/charts/applicants`;
          const params = this.getHttpParams(filter, globalCombinedDates);

          this.updateLoading({ key: 'newApplicants', loading: true });

          return this.http.get<NewApplicantsResponse[]>(url, { params }).pipe(
            tap((result) => this.updateNewApplicants(result)),
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
}
