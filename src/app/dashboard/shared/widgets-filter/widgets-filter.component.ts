import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ViewWidgetModal,
  WidgetFieldType,
  WidgetsHeader,
} from '../dashboard-model';

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
  @Input() widgetHeader!: WidgetsHeader;
  @Output() showModal = new EventEmitter<ViewWidgetModal>();

  constructor() {}

  doFilter() {
    this.opened = false;
  }
}
