import { Component, OnInit } from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { BehaviorSubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { ApplicantsStore } from '../../store/applicants.store';
import { DefaultWidgetComponent } from '../default-widget.component';

@Component({
  selector: 'brd-widget-applicants-table',
  templateUrl: './widget-applicants-table.component.html',
  styleUrls: ['./widget-applicants-table.component.scss'],
  providers: [ApplicantsStore],
})
export class WidgetApplicantsTableComponent
  extends DefaultWidgetComponent
  implements OnInit
{
  readonly applicants$ = this.applicantsStore.applicants$;
  readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  readonly applicantsPageSize$ = this.applicantsStore.pageSize$;
  readonly applicantsCurrentPage$ = this.applicantsStore.currentPage$;
  readonly applicantsSort$ = this.applicantsStore.sort$;
  readonly applicantsFilter$ = this.applicantsStore.filters$;
  readonly loading$ = this.applicantsStore.loading$;
  readonly selectedId$ = new BehaviorSubject<string>('');
  readonly selectedApplicant$ = this.selectedId$.pipe(
    withLatestFrom(this.applicants$),
    map(([selectedId, applicants]) =>
      applicants.find((applicant) => applicant.id === selectedId)
    )
  );
  public activityTimelineIsOpened: Record<string, boolean> = {
    activity: false,
    comments: false,
  };
  public itemSelected: string[] = []; // dummy selected

  constructor(private readonly applicantsStore: ApplicantsStore) {
    super();
  }

  ngOnInit(): void {
    this.applicantsStore.setId(this.id);
  }

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
}
