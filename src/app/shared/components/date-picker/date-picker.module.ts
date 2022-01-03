import { NgModule } from '@angular/core';
import { NglDatepickersModule } from 'ng-lightning';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
  imports: [NglDatepickersModule],
})
export class BRDDatePickerModule {}
