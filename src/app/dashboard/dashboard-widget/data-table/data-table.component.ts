import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobService } from '../../store/job.service';
import { Applicant, Job } from '../../store/jazz-api.model';

@Component({
  selector: 'brd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() dataSet: Applicant[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;
  @Input() sort: INglDatatableSort = { key: '', order: 'desc' };
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<INglDatatableSort>();
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
  startDate!: Date;
  endDate!: Date;
  options: Observable<string[]> = this.jobService.entities$.pipe(
    map((value: Job[]) => {
      return value.map(({ title }) => title.trim());
    })
  );
  itemSelected: string[] = []; // dummy selected

  constructor(private readonly jobService: JobService) {}

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
}
