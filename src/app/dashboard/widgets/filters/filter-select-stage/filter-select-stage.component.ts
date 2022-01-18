import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartsStore } from 'src/app/dashboard/store/charts.store';
import { WidgetFilterSelectStage } from '../../widget.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'brd-filter-select-stage',
  templateUrl: './filter-select-stage.component.html',
  styleUrls: ['./filter-select-stage.component.scss'],
})
export class FilterSelectStageComponent implements FilterComponent {
  @Input() filter: WidgetFilterSelectStage;
  @Output() changed = new EventEmitter<WidgetFilterSelectStage>();
  readonly stages$: Observable<string[]> = this.chartsStore.stages$;

  constructor(private readonly chartsStore: ChartsStore) {}

  onItemSelected(items: string[]): void {
    this.changed.emit({
      ...this.filter,
      value: [...items],
    });
  }
}
