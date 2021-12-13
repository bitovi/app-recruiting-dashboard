import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {FilterState, FilterStore} from './filter.store';
import {DashboardWidgets, ViewWidgetModal, WidgetFieldType, WidgetsHeader,} from './shared/dashboard-model';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore],
})
export class DashboardComponent {
  date: Date = new Date();
  viewWidgetModal: ViewWidgetModal = {
    openModal: false,
    openedModal: undefined,
  };
  dashboardWidgets = DashboardWidgets;
  readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  barChartFilterFields: WidgetsHeader = {
    widgetType: DashboardWidgets.BAR_CHART,
    widgetFilterFields: [
      { fieldType: WidgetFieldType.DATE_RANGE },
      { fieldType: WidgetFieldType.CHECK_BOX, fields: [{}] },
    ],
  };

  doughnutChartFilterFields: WidgetsHeader = {
    widgetType: DashboardWidgets.DOUGHNUT_CHART,
    widgetFilterFields: [],
  };

  constructor(private readonly filterStore: FilterStore) {}

  setFilterState(state: FilterState) {
    this.filterStore.setState(state);
  }

  closeModal() {
    this.viewWidgetModal = { openModal: false, openedModal: undefined };
  }
}
