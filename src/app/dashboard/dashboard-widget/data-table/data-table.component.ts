import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Applicant, ApplicantFilterState } from '../../../core/interfaces';

@Component({
  selector: 'brd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() dataSet: Applicant[] = [];
  @Input() jobsLabels: string[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;
  @Input() sort: INglDatatableSort = { key: '', order: 'desc' };
  @Input() filters: ApplicantFilterState = {
    date: { startDate: null, endDate: null },
    position: [],
  };
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<INglDatatableSort>();
  @Output() filterChange = new EventEmitter<Partial<ApplicantFilterState>>();
  readonly selectedId$ = new BehaviorSubject<string>('');
  readonly selectedApplicant$ = this.selectedId$.pipe(
    map((selectedId) =>
      this.dataSet.find((applicant) => applicant.id === selectedId)
    )
  );

  public activityTimelineIsOpened: Record<string, boolean> = {
    activity: false,
    comments: false,
  };
  public openedFilter = false;
  public itemSelected: string[] = []; // dummy selected

  public onSort(event: INglDatatableSort) {
    this.sortChange.emit(event);
  }

  public onPageChange(pageNumber: number) {
    if (pageNumber) {
      this.pageChange.emit(pageNumber);
    }
  }

  public onClickInfo(id: string) {
    this.selectedId$.next(id);
  }

  public close() {
    this.selectedId$.next('');
  }

  public onItemSelected(items: any[]) {
    this.filterChange.emit({
      position: items,
    });
  }

  public onChangeCustomStartDate(date: string | Date): void {
    if (typeof date === 'string') {
      // documentation states that only Date is returned from valueChange event
      return;
    }
    this.filterChange.emit({
      date: { startDate: date, endDate: this.filters.date.endDate },
    });
  }

  public onChangeCustomEndDate(date: string | Date): void {
    if (typeof date === 'string') {
      // documentation states that only Date is returned from valueChange event
      return;
    }
    this.filterChange.emit({
      date: { startDate: this.filters.date.startDate, endDate: date },
    });
  }
}
