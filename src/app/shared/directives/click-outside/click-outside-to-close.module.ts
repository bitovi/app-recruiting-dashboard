import { NgModule } from '@angular/core';
import { ClickOutsideToCloseDirective } from './click-outside-to-close.directive';

@NgModule({
  declarations: [ClickOutsideToCloseDirective],
  exports: [ClickOutsideToCloseDirective],
})
export class ClickOutsideToCloseDirectiveModule {}
