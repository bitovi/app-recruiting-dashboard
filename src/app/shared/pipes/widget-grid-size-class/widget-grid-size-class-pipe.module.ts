import { NgModule } from '@angular/core';
import { WidgetGridSizeClassPipe } from './widget-grid-size-class.pipe';

@NgModule({
  declarations: [WidgetGridSizeClassPipe],
  providers: [WidgetGridSizeClassPipe],
  exports: [WidgetGridSizeClassPipe],
})
export class WidgetGridSizeClassPipeModule {}
