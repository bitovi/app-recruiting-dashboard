import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterState } from '../../store/filter.store';
import { DashboardFilters, FiltersLabels } from '../../shared/dashboard-model';
import moment from 'moment';

@Component({
  selector: 'brd-page-filter-widget',
  templateUrl: './page-filter-widget.component.html',
  styleUrls: ['./page-filter-widget.component.scss'],
})
export class PageFilterWidgetComponent {
  @Input() public startDate: Date = new Date();
  @Input() public endDate: Date = new Date();
  @Input() public totalApplicants: number = 0;
  @Output() public selected = new EventEmitter<FilterState>();

  public options: DashboardFilters[] = [
    { durationCount: 7, label: FiltersLabels.SEVEN_DAYS },
    { durationCount: 30, label: FiltersLabels.THIRTY_DAYS },
    { durationCount: 60, label: FiltersLabels.SIXTY_DAYS },
    { durationCount: 90, label: FiltersLabels.NINETY_DAYS },
    { durationCount: Number.POSITIVE_INFINITY, label: FiltersLabels.CUSTOM },
  ];

  selectedInput = FiltersLabels.SEVEN_DAYS;
  filtersLabels = FiltersLabels;
  isCustomFilterPopoverOpen = false;

  closeCustomFilterPopover() {
    this.isCustomFilterPopoverOpen = false;
  }

  public onChange(selected: string) {
    if (selected !== FiltersLabels.CUSTOM) {
      const option = this.options.find((val) => val.label === selected);

      if (option) {
        const endDate = new Date();
        const startDate = moment(endDate)
          .subtract(option.durationCount, 'days')
          .toDate();
        this.selected.emit({ startDate, endDate });
      }
    }
  }

  public onChangeCustomStartDate(date: string | Date): void {
    const convertedDate: Date = new Date(date);

    this.selected.emit({ startDate: convertedDate, endDate: this.endDate });
  }

  public onChangeCustomEndDate(date: string | Date): void {
    const convertedDate: Date = new Date(date);

    this.selected.emit({ startDate: this.startDate, endDate: convertedDate });
  }
}
