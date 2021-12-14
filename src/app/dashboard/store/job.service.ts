import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Job } from './jazz-api.model';

@Injectable({ providedIn: 'root' })
export class JobService extends EntityCollectionServiceBase<Job> {
  readonly jobs$ = this.entities$;

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Jobs', serviceElementsFactory);
  }
}
