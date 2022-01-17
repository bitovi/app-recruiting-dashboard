import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NglComboboxesModule,
  NglIconsModule,
  NglSpinnersModule,
  NglPillsModule,
} from 'ng-lightning';
import { ComboboxComponent } from './combobox.component';
import { ClickOutsideToCloseDirectiveModule } from 'src/app/shared/directives';
import {
  LabelToArrayPipeModule,
  SelectedOptionPipeModule,
} from 'src/app/shared/pipes';

@NgModule({
  declarations: [ComboboxComponent],
  exports: [ComboboxComponent],
  imports: [
    CommonModule,
    NglComboboxesModule,
    NglIconsModule,
    NglPillsModule,
    NglSpinnersModule,
    ClickOutsideToCloseDirectiveModule,
    SelectedOptionPipeModule,
    LabelToArrayPipeModule,
  ],
})
export class ComboboxModule {}
