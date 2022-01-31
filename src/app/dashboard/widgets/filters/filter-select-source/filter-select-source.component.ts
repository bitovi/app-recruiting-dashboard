import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApplicantsBySourceResponse } from '../../../../core/interfaces';
import { ApplicantsBySourceStore } from '../../../store/applicants-by-source.store';
import { WidgetFilterSelectSource } from '../../widget.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'brd-filter-select-source',
  templateUrl: './filter-select-source.component.html',
  styleUrls: ['./filter-select-source.component.scss'],
  providers: [ApplicantsBySourceStore],
})
export class FilterSelectSourceComponent implements FilterComponent {
  @Input() filter: WidgetFilterSelectSource;
  @Output() changed = new EventEmitter<WidgetFilterSelectSource>();

  readonly sources$: Observable<string[]> =
    this.applicantsBySourceStore.applicantsBySource$.pipe(
      map((applicantsBySourceResponse: IApplicantsBySourceResponse[]) =>
        applicantsBySourceResponse
          .map(
            (applicantsBySource: IApplicantsBySourceResponse) =>
              applicantsBySource.source
          )
          .filter((source: string) => !!source.length)
      )
    );

  constructor(
    private readonly applicantsBySourceStore: ApplicantsBySourceStore
  ) {}

  public onItemSelected(items: string[]) {
    this.changed.emit({
      ...this.filter,
      value: items,
    });
  }
}
