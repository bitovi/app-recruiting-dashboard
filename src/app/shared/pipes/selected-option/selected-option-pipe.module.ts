import { NgModule } from '@angular/core';
import { OptionIsSelectedPipe } from './option-is-selected.pipe';

@NgModule({
  declarations: [OptionIsSelectedPipe],
  exports: [OptionIsSelectedPipe],
})
export class SelectedOptionPipeModule {}
