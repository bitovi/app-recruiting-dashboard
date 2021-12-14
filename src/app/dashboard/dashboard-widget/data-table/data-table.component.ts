import {Component} from '@angular/core';
import {INglDatatableRowClick, INglDatatableSort} from 'ng-lightning';
import {ApplicantDetails, DataTable} from './data-table';
import {BehaviorSubject} from 'rxjs';

const DATA = [
  {
    id: 1,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 2,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 3,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 4,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 5,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 6,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 7,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 8,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 9,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 10,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 11,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
  {
    id: 12,
    current_stage: 'interview',
    name: 'Kareem Abdul-Jabbar',
    position: 'Angular',
    comments: 'doing well',
    tableConfig: { sortable: true },
  },
];

@Component({
  selector: 'brd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  data: DataTable[] = [...DATA];
  currentPage = 1;
  itemPerPage = 7;
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

  constructor() {}

  onSort(event: INglDatatableSort) {
    console.log(event, 'sort');
  }

  onClickRow(event: INglDatatableRowClick) {
    console.log(event, 'row clicked');
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    console.log(pageNumber);
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
