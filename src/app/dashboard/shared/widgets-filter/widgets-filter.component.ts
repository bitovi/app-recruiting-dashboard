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
  public opened = false;
  public fieldTypes = WidgetFieldType;

  @Input() public startDate: Date = new Date();
  @Input() public endDate: Date = new Date();
  @Input() public widgetHeader!: WidgetsHeader;
  @Output() public showModal = new EventEmitter<ViewWidgetModal>();

  constructor() {}

  public doFilter() {
    this.opened = false;
  }
}
