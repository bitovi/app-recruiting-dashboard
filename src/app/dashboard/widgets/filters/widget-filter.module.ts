import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxModule } from '../../shared/combobox/combobox.module';
import { WidgetFilterComponent } from './widget-filter.component';
import { FilterSelectJobComponent } from './filter-select-jobs/filter-select-job.component';
import { BRDDatePickerModule } from 'src/app/shared/components/date-picker/date-picker.module';

@NgModule({
  declarations: [WidgetFilterComponent, FilterSelectJobComponent],
  exports: [WidgetFilterComponent, FilterSelectJobComponent],
  imports: [CommonModule, ComboboxModule, BRDDatePickerModule],
})
export class WidgetFilterModule {}
