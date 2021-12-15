import { Component, Input, OnChanges } from '@angular/core';
import { INglDatatableRowClick, INglDatatableSort } from 'ng-lightning';
import { DataTable } from './data-table';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ApplicantService } from '../../store/applicant.service';

@Component({
  selector: 'brd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input() dataSet: DataTable[] = [];
  readonly currentPage$ = new BehaviorSubject<number>(1);
  readonly dataSet$ = new BehaviorSubject<DataTable[]>([]);
  readonly paginatedData$ = combineLatest([
    this.currentPage$,
    this.dataSet$,
  ]).pipe(
    map(([currentPage, dataSet]) => {
      const startIndex = currentPage * this.pageSize - this.pageSize;
      return dataSet.slice(startIndex, startIndex + this.pageSize);
    })
  );
  readonly selectedId$ = new BehaviorSubject<string>('');
  readonly selectedApplicant$ = this.selectedId$.pipe(
    filter((id) => id !== ''),
    tap((id) => this.applicantService.getByKey(id)),
    switchMap((id) =>
      this.applicantService.entityMap$.pipe(map((entities) => entities[id]))
    )
  );
  pageSize = 10;
  hideName = false;
  loadingData = true;
  sort: INglDatatableSort = { key: 'current_stage', order: 'asc' };
  activityTimelineIsOpened: Record<string, boolean> = {
    activity: false,
    comments: false,
  };

  constructor(private applicantService: ApplicantService) {}

  ngOnChanges(): void {
    if (this.dataSet) {
      this.dataSet$.next(this.dataSet);
    }
  }

  onSort(event: INglDatatableSort) {
    console.log(event, 'sort');
  }

  onClickRow(event: INglDatatableRowClick) {
    console.log(event, 'row clicked');
  }

  onPageChange(pageNumber: number) {
    if (pageNumber) {
      this.currentPage$.next(pageNumber);
    }
  }

  onClickInfo(id: string) {
    this.selectedId$.next(id);
  }

  close() {
    this.selectedId$.next('');
  }
}
