import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Job } from '../../core/interfaces';
import { JobResponse } from './jobs.model';

export interface JobsState {
  jobs: Job[];
  loadingCounter: number;
}

@Injectable()
export class JobsStore extends ComponentStore<JobsState> {
  readonly jobs$: Observable<Job[]> = this.select((state) => state.jobs);
  readonly loading$: Observable<boolean> = this.select(
    (state) => state.loadingCounter
  ).pipe(map((counter) => counter !== 0));

  constructor(private http: HttpClient) {
    super({
      jobs: [],
      loadingCounter: 0,
    });

    this.fetchJobs();
  }

  private readonly updateLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loadingCounter: loading
      ? state.loadingCounter + 1
      : state.loadingCounter - 1,
  }));

  private readonly updateJobs = this.updater((state, jobs: Job[]) => ({
    ...state,
    jobs,
  }));

  private getHttpParams(): HttpParams {
    const params = new HttpParams().set('status', 'Open');

    return params;
  }

  private readonly fetchJobs = this.effect(() => {
    const url = `${environment.api}/jobs`;
    const params = this.getHttpParams();

    this.updateLoading(true);

    return this.http.get<JobResponse>(url, { params }).pipe(
      tap((result) => this.updateJobs(result.data)),
      finalize(() => this.updateLoading(false))
    );
  });
}
