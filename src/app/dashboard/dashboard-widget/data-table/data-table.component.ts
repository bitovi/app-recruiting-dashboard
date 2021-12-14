import {Component} from '@angular/core';
import {INglDatatableRowClick, INglDatatableSort} from 'ng-lightning';
import {DataTable} from './data-table';
import {BehaviorSubject, combineLatest} from 'rxjs';

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
  private selectedItemSubject = new BehaviorSubject<Partial<DataTable>>({});
  selectedItem$ = this.selectedItemSubject.asObservable();
  applicantDetails$ = combineLatest([this.selectedItemSubject]);

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
    this.selectedItemSubject.next(row);
  }

  close() {
    this.selectedItemSubject.next({});
  }

  showDetails() {}
}
