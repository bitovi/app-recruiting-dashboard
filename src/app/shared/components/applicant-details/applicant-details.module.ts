import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NglIconsModule } from 'ng-lightning';
import { ApplicantDetailsComponent } from './applicant-details.component';

@NgModule({
  imports: [NglIconsModule, CommonModule],
  declarations: [ApplicantDetailsComponent],
  exports: [ApplicantDetailsComponent],
})
export class ApplicantDetailsModule {}
