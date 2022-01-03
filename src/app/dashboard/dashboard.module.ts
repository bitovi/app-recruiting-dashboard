import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DataTableComponent } from './dashboard-widget/data-table/data-table.component';
import { NglModule } from 'ng-lightning';
import { DashboardPieChartComponent } from './dashboard-widget/dashboard-pie-chart/dashboard-pie-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { PageFilterWidgetComponent } from './dashboard-widget/page-filter-widget/page-filter-widget.component';
import { WidgetsFilterComponent } from './shared/widgets-filter/widgets-filter.component';
import { LabelToArrayPipe } from './shared/pipe/label-to-array.pipe';
import { ComboboxComponent } from './shared/combobox/combobox.component';
import { ClickOutsideToCloseDirective } from './shared/combobox/click-outside-to-close.directive';
import { OptionIsSelectedPipe } from './shared/pipe/option-is-selected.pipe';
import { HeaderComponent } from './header/header.component';
import { WidgetWrapperComponent } from './dashboard-widget/widget-wrapper.component';
import { WidgetRecruitingStageExitedComponent } from './dashboard-widget/widget-recruiting-stage-exited/widget-recruiting-stage-exited.component';
import { WidgetJobsApplicantsComponent } from './dashboard-widget/widget-jobs-applicants/widget-jobs-applicants.component';
import { WidgetNewApplicantsComponent } from './dashboard-widget/widget-new-applicants/widget-new-applicants.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [
    DashboardComponent,
    DataTableComponent,
    DashboardPieChartComponent,
    PageFilterWidgetComponent,
    WidgetsFilterComponent,
    LabelToArrayPipe,
    ComboboxComponent,
    ClickOutsideToCloseDirective,
    OptionIsSelectedPipe,
    HeaderComponent,
    WidgetWrapperComponent,
    WidgetRecruitingStageExitedComponent,
    WidgetJobsApplicantsComponent,
    WidgetNewApplicantsComponent,
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
