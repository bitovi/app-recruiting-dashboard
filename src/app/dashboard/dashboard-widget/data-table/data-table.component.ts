import { Component, Input, OnChanges } from '@angular/core';
import { INglDatatableRowClick, INglDatatableSort } from 'ng-lightning';
import { DataTable } from './data-table';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ApplicantService } from '../../store/applicant.service';
import { JobService } from '../../store/job.service';
import { Job } from '../../store/jazz-api.model';

type DataTableSortableKeys = 'current_stage' | 'name' | 'position' | 'comments';

@Component({
  selector: 'brd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input() dataSet: DataTable[] = [];
  readonly currentPage$ = new BehaviorSubject<number>(1);
  readonly dataSet$ = new BehaviorSubject<DataTable[]>([]);
  readonly filter$ = new BehaviorSubject<INglDatatableSort | undefined>(
    undefined
  );
  readonly filteredData$ = combineLatest([this.dataSet$, this.filter$]).pipe(
    map(([dataSet, filter]) => {
      if (!filter) {
        return dataSet;
      }
      return dataSet.sort((a, b) => {
        const x = a[filter.key as DataTableSortableKeys] || '';
        const y = b[filter.key as DataTableSortableKeys] || '';
        if (filter.order === 'asc') {
          return y.localeCompare(x);
        }
        return x.localeCompare(y);
      });
    })
  );
  readonly paginatedData$ = combineLatest([
    this.currentPage$,
    this.filteredData$,
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
  @Input() showLoader: boolean | null = false;
  sort: INglDatatableSort = { key: 'name', order: 'asc' };
  activityTimelineIsOpened: Record<string, boolean> = {
    activity: false,
    comments: false,
  };

  openedFilter = false;
  startDate!: Date;
  endDate!: Date;
  options: Observable<string[]> = this.jobService.entities$.pipe(
    map((value: Job[]) => {
      return value.map(({ title }) => title.trim());
    })
  );
  itemSelected: string[] = []; // dummy selected

  constructor(
    private applicantService: ApplicantService,
    private readonly jobService: JobService
  ) {}

  ngOnChanges(): void {
    if (this.dataSet) {
      this.dataSet$.next(this.dataSet);
    }
  }

  onSort(event: INglDatatableSort) {
    this.filter$.next(event);
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

  onItemSelected(items: any[]) {
    console.info(items, 'items selected');
  }
}
