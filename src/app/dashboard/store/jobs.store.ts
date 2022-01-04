import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { Job } from '../../core/interfaces';
import { JobsApiService } from '../services/jobs-api.service';

export interface JobsState {
  jobs: Job[];
  loadingCounter: number;
}

@Injectable()
export class JobsStore extends ComponentStore<JobsState> {
  readonly jobs$: Observable<Job[]> = this.select(
    (state: JobsState) => state.jobs
  );
  readonly loading$: Observable<boolean> = this.select(
    (state: JobsState) => state.loadingCounter
  ).pipe(map((counter) => counter !== 0));

  constructor(private jobsApiService: JobsApiService) {
    super({
      jobs: [],
      loadingCounter: 0,
    });

    this.fetchJobs();
  }

  private readonly updateLoading = this.updater(
    (state, loading: boolean): JobsState => ({
      ...state,
      loadingCounter: loading
        ? state.loadingCounter + 1
        : state.loadingCounter - 1,
    })
  );

  private readonly updateJobs = this.updater(
    (state, jobs: Job[]): JobsState => ({
      ...state,
      jobs,
    })
  );

  private readonly fetchJobs = this.effect(() => {
    const params: HttpParams = this.jobsApiService.getHttpParams();

    this.updateLoading(true);

    return this.jobsApiService.getJobs(params).pipe(
      tap((result) => this.updateJobs(result.data)),
      finalize(() => this.updateLoading(false))
    );
  });
}
