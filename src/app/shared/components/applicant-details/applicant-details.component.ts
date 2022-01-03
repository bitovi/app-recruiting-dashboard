import { Component, Input } from '@angular/core';
import { Applicant } from '../../../core/interfaces';

@Component({
  selector: 'brd-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss'],
})
export class ApplicantDetailsComponent {
  @Input()
  public applicant: Applicant = null;
  public activityTimelineIsOpened: Record<string, boolean> = {};
}
