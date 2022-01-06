import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NglDatatablesModule, NglModule } from 'ng-lightning';
import { NgChartsModule } from 'ng2-charts';
import { PageFilterWidgetComponent } from './widgets/page-filter-widget/page-filter-widget.component';
import { WidgetsFilterComponent } from './shared/widgets-filter/widgets-filter.component';
import { HeaderComponent } from './header/header.component';
import { ClickOutsideToCloseDirectiveModule } from '../shared/directives';
import { ApplicantService } from './services/applicants-api.service';
import { ChartApiService } from './services/charts-api.service';
import { JobsApiService } from './services/jobs-api.service';
import {
  LabelToArrayPipeModule,
  SelectedOptionPipeModule,
} from '../shared/pipes';
import { BRDDatePickerModule } from '../shared/components/date-picker/date-picker.module';
import { ApplicantDetailsModule } from '../shared/components';
import { WidgetWrapperComponent } from './widgets/widget-wrapper.component';
import { WidgetRecruitingStageExitedComponent } from './widgets/widget-recruiting-stage-exited/widget-recruiting-stage-exited.component';
import { WidgetJobsApplicantsComponent } from './widgets/widget-jobs-applicants/widget-jobs-applicants.component';
import { WidgetNewApplicantsComponent } from './widgets/widget-new-applicants/widget-new-applicants.component';
import { WidgetApplicantsTableComponent } from './widgets/widget-applicants-table/widget-applicants-table.component';
import { WidgetFilterModule } from './widgets/filters/widget-filter.module';
import { ComboboxModule } from './shared/combobox/combobox.module';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [
    DashboardComponent,
    PageFilterWidgetComponent,
    WidgetsFilterComponent,
    HeaderComponent,
    WidgetWrapperComponent,
    WidgetRecruitingStageExitedComponent,
    WidgetJobsApplicantsComponent,
    WidgetNewApplicantsComponent,
    WidgetApplicantsTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NglModule,
    NglDatatablesModule,
    NgChartsModule,
    ClickOutsideToCloseDirectiveModule,
    LabelToArrayPipeModule,
    SelectedOptionPipeModule,
    BRDDatePickerModule,
    ApplicantDetailsModule,
    ComboboxModule,
    WidgetFilterModule,
  ],
  providers: [ApplicantService, ChartApiService, JobsApiService],
})
export class DashboardModule {}
