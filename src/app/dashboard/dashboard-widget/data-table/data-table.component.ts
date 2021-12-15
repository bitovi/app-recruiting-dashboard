import { Component, Input, OnChanges } from '@angular/core';
import { INglDatatableRowClick, INglDatatableSort } from 'ng-lightning';
import { ApplicantDetails, DataTable } from './data-table';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
  pageSize = 10;
  hideName = false;
  loadingData = true;
  sort: INglDatatableSort = { key: 'current_stage', order: 'asc' };
  activityTimelineIsOpened: Record<string, boolean> = {
    activity: false,
    comments: false,
  };

  openInfo!: boolean;
  selected!: number;
  selectedItem!: Partial<DataTable>;
  private applicantDetailsSubject = new BehaviorSubject<ApplicantDetails>({});
  applicantDetails$ = this.applicantDetailsSubject.asObservable();

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

  onClickInfo(row: DataTable) {
    this.selectedItem = row;
    // DUMMY DATA
    const details: ApplicantDetails = {
      id: 'prospect_20211213184816_OUE9OFKPJH8XLJWA',
      first_name: 'Kareem',
      last_name: 'Abdul-Jabbar',
      email: 'kbcox001@gmail.com',
      address: '833 Hackney Lane',
      location:
        '833 Hackney Lane Shelbyville, Kentucky, United States KY 40065',
      phone: '+1 5029383453',
      resume_link:
        'https://s3.amazonaws.com/resumator/customer_20130208084208_HIRIKECRYT4FLQMF/resumes/resume_61b79570ae843.docx',
      activities: [
        {
          id: '1',
          activity:
            'Adam seemed interested in the team lets get him here fast.',
          date: new Date('2021-12-13').toLocaleDateString(),
          time: '18:48:16',
        },
      ],
      comments: [
        {
          id: '1',
          date: new Date().toLocaleDateString(),
          commentBy: 'J Sunny',
          comment: 'This Is a test Comment',
        },
      ],
    };
    this.applicantDetailsSubject.next(details);
  }

  close() {
    this.selectedItem = {};
  }

  showDetails() {}
}
