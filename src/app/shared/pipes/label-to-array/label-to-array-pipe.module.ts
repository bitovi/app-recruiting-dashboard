import { NgModule } from '@angular/core';
import { LabelToArrayPipe } from './label-to-array.pipe';

@NgModule({
  declarations: [LabelToArrayPipe],
  exports: [LabelToArrayPipe],
  providers: [LabelToArrayPipe],
})
export class LabelToArrayPipeModule {}
