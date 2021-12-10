import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {FilterState, FilterStore} from './filter.store';
import {DashboardWidgets, ViewWidgetModal, WidgetFieldType, WidgetFilterFields,} from './shared/dashboard-model';

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

  barChartFilterFields: WidgetFilterFields = {
    widgetType: DashboardWidgets.BAR_CHART,
    fieldType: WidgetFieldType.DATE_RANGE,
  };

  doughnutChartFilterFields: WidgetFilterFields = {
    widgetType: DashboardWidgets.DOUGHNUT_CHART,
    fieldType: undefined,
  };

  constructor(private readonly filterStore: FilterStore) {}

  setFilterState(state: FilterState) {
    this.filterStore.setState(state);
  }

  closeModal() {
    this.viewWidgetModal = { openModal: false, openedModal: undefined };
  }
}
