import {HttpClient} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {
  DefaultDataServiceConfig,
  DefaultDataServiceFactory,
  EntityCollectionDataService,
  HttpUrlGenerator,
} from '@ngrx/data';
import {JazzApiDataService} from './jazz-api-data.service';

@Injectable()
export class JazzApiDataServiceFactory extends DefaultDataServiceFactory {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() config?: DefaultDataServiceConfig
  ) {
    super(http, httpUrlGenerator, config);
  }

  create<T>(entityName: string): EntityCollectionDataService<T> {
    return new JazzApiDataService<T>(
      entityName,
      this.http,
      this.httpUrlGenerator,
      this.config
    );
  }
}
