import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateSide } from '../../../core/enums';
import { IDatePickerEvent } from '../../../core/interfaces/date-picker-event.interface';

@Component({
  selector: 'brd-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Output() dateChanged = new EventEmitter<IDatePickerEvent>();

  public dateSides: typeof DateSide = DateSide;

  public dateChange(eventDate: Date | string, dateSide: DateSide): void {
    const convertedDate: Date = new Date(eventDate);
    const dateEvent: IDatePickerEvent = {
      date: convertedDate,
      dateSide,
    };

    this.dateChanged.emit(dateEvent);
  }
}
