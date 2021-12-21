import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { JobService } from '../../store/job.service';
import { Applicant, Job } from '../../store/jazz-api.model';

type DataTableSortableKeys = 'first_name' | 'last_name' | 'job_title';

@Component({
  selector: 'brd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input() dataSet: Applicant[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  readonly dataSet$ = new BehaviorSubject<Applicant[]>([]);
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

  readonly selectedId$ = new BehaviorSubject<string>('');
  readonly selectedApplicant$ = this.selectedId$.pipe(
    withLatestFrom(this.dataSet$),
    map(([selectedId, dataSet]) =>
      dataSet.find((applicant) => applicant.id === selectedId)
    )
  );
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

  constructor(private readonly jobService: JobService) {}

  ngOnChanges(): void {
    if (this.dataSet) {
      this.dataSet$.next(this.dataSet);
    }
  }

  onSort(event: INglDatatableSort) {
    this.filter$.next(event);
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
}
