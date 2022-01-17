import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateSide } from 'src/app/core/enums';
import { IDatePickerEvent } from 'src/app/core/interfaces/date-picker-event.interface';
import { WidgetFilterDateInterval, WidgetFilterUnion } from '../widget.model';

@Component({
  selector: 'brd-widget-filter',
  templateUrl: './widget-filter.component.html',
  styleUrls: ['./widget-filter.component.scss'],
})
export class WidgetFilterComponent {
  @Input() filter: WidgetFilterUnion;
  @Output() changed = new EventEmitter<WidgetFilterUnion>();

  filterDateIntervalChange(
    datePickerEvent: IDatePickerEvent,
    currentFilter: WidgetFilterDateInterval
  ): void {
    const isStartDate = datePickerEvent.dateSide === DateSide.StartDate;
    this.changed.emit({
      ...currentFilter,
      value: {
        startDate: isStartDate
          ? datePickerEvent.date
          : currentFilter.value.startDate,
        endDate: isStartDate
          ? currentFilter.value.endDate
          : datePickerEvent.date,
      },
    });
  }

  filterChange(filter: WidgetFilterUnion): void {
    this.changed.emit(filter);
  }
}
