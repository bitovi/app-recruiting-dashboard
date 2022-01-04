import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateSide } from '../../../core/enums';
import { Applicant, ApplicantFilterState } from '../../../core/interfaces';
import { IDatePickerEvent } from '../../../core/interfaces/date-picker-event.interface';

@Component({
  selector: 'brd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input() public dataSet: Applicant[] = [];
  @Input() public jobsLabels: string[] = [];
  @Input() public currentPage: number = 1;
  @Input() public pageSize: number = 10;
  @Input() public total: number = 0;
  @Input() public sort: INglDatatableSort = { key: '', order: 'desc' };
  @Input() public filters: ApplicantFilterState = {
    date: { startDate: new Date(), endDate: new Date() },
    position: [],
  };
  @Output() public pageChange = new EventEmitter<number>();
  @Output() public sortChange = new EventEmitter<INglDatatableSort>();
  @Input() public isLoading: boolean | null = false;
  @Output()
  public filterChange = new EventEmitter<Partial<ApplicantFilterState>>();
  public readonly selectedId$ = new BehaviorSubject<string>('');
  public readonly selectedApplicant$ = this.selectedId$.pipe(
    map((selectedId) =>
      this.dataSet.find((applicant) => applicant.id === selectedId)
    )
  );

  ngOnChanges(): void {
    console.log(this.dataSet);
  }

  public activityTimelineIsOpened: Record<string, boolean> = {
    activity: false,
    comments: false,
  };
  public openedFilter = false;
  public itemSelected: string[] = [];

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

  public closeUserInfoModal() {
    this.selectedId$.next('');
  }

  public onItemSelected(items: any[]) {
    this.filterChange.emit({
      position: items,
    });
  }

  public changeCustomDate(datePickerEvent: IDatePickerEvent) {
    if (datePickerEvent.dateSide === DateSide.StartDate) {
      this.filterChange.emit({
        date: {
          startDate: datePickerEvent.date,
          endDate: this.filters.date.endDate,
        },
      });

      return;
    }

    this.filterChange.emit({
      date: {
        startDate: this.filters.date.startDate,
        endDate: datePickerEvent.date,
      },
    });
  }
}
