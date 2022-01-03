import { Component } from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { BehaviorSubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { DateSide } from 'src/app/core/enums';
import { IDatePickerEvent } from 'src/app/core/interfaces/date-picker-event.interface';
import { ApplicantsStore } from '../../store/applicants.store';
import { JobsStore } from '../../store/jobs.store';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'brd-widget-applicants-table',
  templateUrl: './widget-applicants-table.component.html',
  styleUrls: ['./widget-applicants-table.component.scss'],
})
export class WidgetApplicantsTableComponent implements WidgetComponent {
  readonly applicants$ = this.applicantsStore.applicants$;
  readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  readonly applicantsPageSize$ = this.applicantsStore.pageSize$;
  readonly applicantsCurrentPage$ = this.applicantsStore.currentPage$;
  readonly applicantsSort$ = this.applicantsStore.sort$;
  readonly applicantsFilter$ = this.applicantsStore.filters$;
  readonly jobsLabels$ = this.jobsStore.jobs$.pipe(
    map((jobs) => jobs.map((job) => job.title))
  );
  readonly loading$ = this.applicantsStore.loading$;
  readonly selectedId$ = new BehaviorSubject<string>('');
  readonly selectedApplicant$ = this.selectedId$.pipe(
    withLatestFrom(this.applicants$),
    map(([selectedId, applicants]) =>
      applicants.find((applicant) => applicant.id === selectedId)
    )
  );

  constructor(
    private readonly applicantsStore: ApplicantsStore,
    private readonly jobsStore: JobsStore
  ) {}

  public activityTimelineIsOpened: Record<string, boolean> = {
    activity: false,
    comments: false,
  };
  public openedFilter = false;
  public itemSelected: string[] = []; // dummy selected

  public onSort(event: INglDatatableSort) {
    this.applicantsStore.setSort(event);
  }

  public onPageChange(page: number) {
    if (page) {
      this.applicantsStore.setPage(page);
    }
  }

  public onClickInfo(id: string) {
    this.selectedId$.next(id);
  }

  public closeUserInfoModal() {
    this.selectedId$.next('');
  }

  public onItemSelected(items: any[]) {
    this.applicantsStore.setFilter({ position: items });
  }

  public changeCustomDate(
    datePickerEvent: IDatePickerEvent,
    startDate: Date,
    endDate: Date
  ) {
    if (datePickerEvent.dateSide === DateSide.StartDate) {
      this.applicantsStore.setFilter({
        date: { startDate: datePickerEvent.date, endDate },
      });

      return;
    }

    this.applicantsStore.setFilter({
      date: { startDate, endDate: datePickerEvent.date },
    });
  }
}
