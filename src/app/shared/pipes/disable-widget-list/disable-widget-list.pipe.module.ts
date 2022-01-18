import { NgModule } from '@angular/core';
import { DisableWidgetListPipe } from './disable-widget-list.pipe';

@NgModule({
  declarations: [DisableWidgetListPipe],
  exports: [DisableWidgetListPipe],
  providers: [DisableWidgetListPipe],
})
export class DisableWidgetListPipeModule {}
