import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Applicant } from '../../store/jazz-api.model';
import { DateFilter } from '../../store/store.model';

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
  @Input() filter: DateFilter = {
    startDate: null,
    endDate: null,
  };
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<INglDatatableSort>();
  @Output() filterChange = new EventEmitter<DateFilter>();
  readonly selectedId$ = new BehaviorSubject<string>('');
  readonly selectedApplicant$ = this.selectedId$.pipe(
    map((selectedId) =>
      this.dataSet.find((applicant) => applicant.id === selectedId)
    )
  );
  hideName = false;
  @Input() showLoader: boolean | null = false;
  activityTimelineIsOpened: Record<string, boolean> = {
    activity: false,
    comments: false,
  };
  openedFilter = false;
  itemSelected: string[] = []; // dummy selected

  onSort(event: INglDatatableSort) {
    this.sortChange.emit(event);
  }

  onPageChange(pageNumber: number) {
    if (pageNumber) {
      this.pageChange.emit(pageNumber);
    }
  }

  onClickInfo(id: string) {
    this.selectedId$.next(id);
  }

  close() {
    this.selectedId$.next('');
  }

  onItemSelected(items: any[]) {
    console.info(items, 'items selected');
  }

  onChangeCustomStartDate(date: string | Date): void {
    if (typeof date === 'string') {
      // documentation states that only Date is returned from valueChange event
      return;
    }
    this.filterChange.emit({ startDate: date, endDate: this.filter.endDate });
  }

  onChangeCustomEndDate(date: string | Date): void {
    if (typeof date === 'string') {
      // documentation states that only Date is returned from valueChange event
      return;
    }
    this.filterChange.emit({ startDate: this.filter.startDate, endDate: date });
  }
}
