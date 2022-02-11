import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartLoading, ChartsStore } from '../../../store/charts.store';
import { WidgetFilterSelectSource } from '../../widget.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'brd-filter-select-source',
  templateUrl: './filter-select-source.component.html',
  styleUrls: ['./filter-select-source.component.scss'],
})
export class FilterSelectSourceComponent implements FilterComponent {
  @Input() public filter: WidgetFilterSelectSource;
  @Output() public changed = new EventEmitter<WidgetFilterSelectSource>();

  public isLoading$: Observable<boolean> = this.chartsStore.loading$.pipe(
    map((loadingState: ChartLoading) => loadingState.sources > 0)
  );

  public readonly sources$: Observable<string[]> = this.chartsStore.sources$;

  constructor(private readonly chartsStore: ChartsStore) {}

  public onItemSelected(items: string[]) {
    this.changed.emit({
      ...this.filter,
      value: items,
    });
  }
}
