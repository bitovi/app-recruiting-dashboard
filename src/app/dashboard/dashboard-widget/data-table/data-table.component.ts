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
  @Input() public dataSet: Applicant[] = [];
  @Input() public jobsLabels: string[] = [];
  @Input() public currentPage: number = 1;
  @Input() public pageSize: number = 10;
  @Input() public total: number = 0;
  @Input() public sort: INglDatatableSort = { key: '', order: 'desc' };
  @Input() public filters: ApplicantFilterState = {
    date: { startDate: null, endDate: null },
    position: [],
  };
  @Output() public pageChange = new EventEmitter<number>();
  @Output() public sortChange = new EventEmitter<INglDatatableSort>();
  @Input() public showLoader: boolean | null = false;
  @Output()
  public filterChange = new EventEmitter<Partial<ApplicantFilterState>>();
  public readonly selectedId$ = new BehaviorSubject<string>('');
  public readonly selectedApplicant$ = this.selectedId$.pipe(
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
