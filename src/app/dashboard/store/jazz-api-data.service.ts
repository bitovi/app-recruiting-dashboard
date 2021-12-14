import { HttpClient, HttpParams } from '@angular/common/http';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  HttpUrlGenerator,
  QueryParams,
} from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { expand, reduce } from 'rxjs/operators';

export class JazzApiDataService<T> extends DefaultDataService<T> {
  constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    config?: DefaultDataServiceConfig
  ) {
    super(entityName, http, httpUrlGenerator, config);
  }

  getAll(): Observable<T[]> {
    return this.execute('GET', this.entitiesUrl).pipe(
      expand((data, i) => {
        if (data.length < 100) {
          return of();
        }
        return this.execute('GET', `${this.entitiesUrl}page/${i + 1}`);
      }),
      reduce((acc, data) => acc.concat(data))
    );
  }

  getWithQuery(queryParams: string | QueryParams): Observable<T[]> {
    const qParams =
      typeof queryParams === 'string'
        ? { fromString: queryParams }
        : { fromObject: queryParams };
    const params = new HttpParams(qParams);
    const entitiesUrl = this.getEntitiesWithQueryParams(params);
    return this.execute('GET', entitiesUrl, undefined).pipe(
      expand((data, i) => {
        if (!data || data.length < 100) {
          return of();
        }
        return this.execute('GET', `${entitiesUrl}page/${i + 2}`, undefined);
      }),
      reduce((acc, data) => acc.concat(data), [])
    );
  }

  private getEntitiesWithQueryParams(params: HttpParams): string {
    return (
      this.entitiesUrl +
      params
        .keys()
        .map((key) => `${key}/${params.get(key)}/`)
        .join('')
    );
  }
}
