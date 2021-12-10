import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ViewWidgetModal, WidgetFieldType, WidgetFilterFields,} from '../dashboard-model';

@Component({
  selector: 'brd-widgets-filter',
  templateUrl: './widgets-filter.component.html',
  styleUrls: ['./widgets-filter.component.scss'],
})
export class WidgetsFilterComponent {
  opened = false;
  fieldTypes = WidgetFieldType;

  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  @Input() widgetFilterFields!: Partial<WidgetFilterFields>;
  @Output() showModal = new EventEmitter<ViewWidgetModal>();

  constructor() {
    setTimeout(() => {
      console.log(this.widgetFilterFields, 'thanks ');
    });
  }

  doFilter() {
    this.opened = false;
  }
}
