import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApplicantsBySourceResponse } from '../../../../core/interfaces';
import { ChartsStore } from '../../../store/charts.store';
import { WidgetFilterSelectSource } from '../../widget.model';

@Component({
  selector: 'brd-filter-select-source',
  templateUrl: './filter-select-source.component.html',
  styleUrls: ['./filter-select-source.component.scss'],
})
export class FilterSelectSourceComponent {
  @Input() filter: WidgetFilterSelectSource;
  @Output() changed = new EventEmitter<WidgetFilterSelectSource>();
  readonly sources$: Observable<string[]> =
    this.chartsStore.applicantsBySource$.pipe(
      map((applicantsBySourceResponse: IApplicantsBySourceResponse[]) =>
        applicantsBySourceResponse
          .map(
            (applicantsBySource: IApplicantsBySourceResponse) =>
              applicantsBySource.source
          )
          .filter((source: string) => !!source.length)
      )
    );

  constructor(private readonly chartsStore: ChartsStore) {}

  public onItemSelected(items: string[]) {
    this.changed.emit({
      ...this.filter,
      value: items,
    });
  }
}
