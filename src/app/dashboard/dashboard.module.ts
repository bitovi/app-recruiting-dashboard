import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DataTableComponent } from './dashboard-widget/data-table/data-table.component';
import { NglModule } from 'ng-lightning';
import { DashboardBarChartComponent } from './dashboard-widget/dashboard-bar-chart/dashboard-bar-chart.component';
import { DashboardLineChartComponent } from './dashboard-widget/dashboard-line-chart/dashboard-line-chart.component';
import { DashboardPieChartComponent } from './dashboard-widget/dashboard-pie-chart/dashboard-pie-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardDoughnutChartComponent } from './dashboard-widget/dashboard-doughnut-chart/dashboard-doughnut-chart.component';
import { PageFilterWidgetComponent } from './dashboard-widget/page-filter-widget/page-filter-widget.component';
import { WidgetsFilterComponent } from './shared/widgets-filter/widgets-filter.component';
import { LabelToArrayPipe } from './shared/pipe/label-to-array.pipe';
import { ComboboxComponent } from './shared/combobox/combobox.component';
import { ClickOutsideToCloseDirective } from './shared/combobox/click-outside-to-close.directive';
import { OptionIsSelectedPipe } from './shared/pipe/option-is-selected.pipe';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [
    DashboardComponent,
    DataTableComponent,
    DashboardBarChartComponent,
    DashboardLineChartComponent,
    DashboardPieChartComponent,
    DashboardDoughnutChartComponent,
    PageFilterWidgetComponent,
    WidgetsFilterComponent,
    LabelToArrayPipe,
    ComboboxComponent,
    ClickOutsideToCloseDirective,
    OptionIsSelectedPipe,
  ],
  imports: [
    CommonModule,
    NglModule,
    NgChartsModule,
    RouterModule.forChild(routes),
  ],
  providers: [LabelToArrayPipe],
})
export class DashboardModule {}
