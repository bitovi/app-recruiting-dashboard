import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Applicant } from './jazz-api.model';

@Injectable({ providedIn: 'root' })
export class ApplicantService extends EntityCollectionServiceBase<Applicant> {
  readonly applicants$ = this.entities$;

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Applicants', serviceElementsFactory);
  }
}
