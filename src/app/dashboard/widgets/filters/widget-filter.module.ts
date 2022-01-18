import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxModule } from '../../shared/combobox/combobox.module';
import { WidgetFilterComponent } from './widget-filter.component';
import { FilterSelectJobComponent } from './filter-select-job/filter-select-job.component';
import { BRDDatePickerModule } from 'src/app/shared/components/date-picker/date-picker.module';
import { FilterInputTextComponent } from './filter-input-text/filter-input-text.component';
import { NglInputModule } from 'ng-lightning';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterSelectStageComponent } from './filter-select-stage/filter-select-stage.component';
import { FilterSelectSourceComponent } from './filter-select-source/filter-select-source.component';

@NgModule({
  declarations: [
    WidgetFilterComponent,
    FilterSelectJobComponent,
    FilterSelectStageComponent,
    FilterInputTextComponent,
    FilterSelectSourceComponent,
  ],
  exports: [
    WidgetFilterComponent,
    FilterSelectJobComponent,
    FilterSelectStageComponent,
    FilterInputTextComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComboboxModule,
    BRDDatePickerModule,
    NglInputModule,
  ],
})
export class WidgetFilterModule {}
