import {Component, OnInit} from '@angular/core';
import {DashboardFilters, FilterDateRange, FiltersLabels} from "../../shared/dashboard-model";


@Component({
  selector: 'brd-page-filter-widget',
  templateUrl: './page-filter-widget.component.html',
  styleUrls: ['./page-filter-widget.component.scss']
})
export class PageFilterWidgetComponent implements OnInit {

  options: DashboardFilters[] = [
    {durationCount: 7, label: FiltersLabels.SEVEN_DAYS},
    {durationCount: 30, label: FiltersLabels.THIRTY_DAYS},
    {durationCount: 60, label: FiltersLabels.SIXTY_DAYS},
    {durationCount: 90, label: FiltersLabels.NINETY_DAYS},
    {durationCount: Number.POSITIVE_INFINITY, label: FiltersLabels.CUSTOM},
  ];
  selected = FiltersLabels.THIRTY_DAYS;
  openFilters = false;
  filterDateRange: FilterDateRange = {startDate: new Date(), endDate: new Date()};
  filtersLabels = FiltersLabels;

  constructor() {
  }

  ngOnInit(): void {
  }

  doFilter() {
    this.openFilters = false;
  }

  onChange(selected: string) {
    const findOption = this.options.find(val => val.label === selected);
    const currentDay = new Date();
    if (findOption && findOption.label !== FiltersLabels.CUSTOM) {
      const startDate = new Date().setDate(currentDay.getDate() - findOption.durationCount);
      this.filterDateRange.startDate = new Date(startDate);
      this.filterDateRange.endDate = new Date();
      console.log(this.filterDateRange, ' humanity', startDate);
    }
  }

}
