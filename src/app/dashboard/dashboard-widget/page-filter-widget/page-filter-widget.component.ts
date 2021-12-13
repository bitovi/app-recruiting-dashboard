import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterState, getDateMinusDays } from '../../store/filter.store';
import { DashboardFilters, FiltersLabels } from '../../shared/dashboard-model';

@Component({
  selector: 'brd-page-filter-widget',
  templateUrl: './page-filter-widget.component.html',
  styleUrls: ['./page-filter-widget.component.scss'],
})
export class PageFilterWidgetComponent {
  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  @Input() totalApplicants: number = 0;
  @Output() selected = new EventEmitter<FilterState>();

  options: DashboardFilters[] = [
    { durationCount: 7, label: FiltersLabels.SEVEN_DAYS },
    { durationCount: 30, label: FiltersLabels.THIRTY_DAYS },
    { durationCount: 60, label: FiltersLabels.SIXTY_DAYS },
    { durationCount: 90, label: FiltersLabels.NINETY_DAYS },
    { durationCount: Number.POSITIVE_INFINITY, label: FiltersLabels.CUSTOM },
  ];

  selectedInput = FiltersLabels.THIRTY_DAYS;
  filtersLabels = FiltersLabels;
  isCustomFilterPopoverOpen = false;

  closeCustomFilterPopover() {
    this.isCustomFilterPopoverOpen = false;
  }

  onChange(selected: string) {
    if (selected !== FiltersLabels.CUSTOM) {
      const option = this.options.find((val) => val.label === selected);

      if (option) {
        const endDate = new Date();
        const startDate = getDateMinusDays(endDate, option.durationCount);
        this.selected.emit({ startDate, endDate });
      }
    }
  }

  onChangeCustomStartDate(date: string | Date): void {
    if (typeof date === 'string') {
      // documentation states that only Date is returned from valueChange event
      return;
    }
    this.selected.emit({ startDate: date, endDate: this.endDate });
  }

  onChangeCustomEndDate(date: string | Date): void {
    if (typeof date === 'string') {
      // documentation states that only Date is returned from valueChange event
      return;
    }
    this.selected.emit({ startDate: this.startDate, endDate: date });
  }
}
