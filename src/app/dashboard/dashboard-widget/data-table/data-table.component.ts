import {Component, OnInit, TemplateRef} from '@angular/core';
import {INglDatatableRowClick, INglDatatableSort} from "ng-lightning";

interface TableConfig {
  heading: string;
  template?: TemplateRef<any>;
  key: string;
  truncate: boolean
  sortable: boolean
  headClass?: string;
  cellClass?: string;
}
const DATA = [
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},
  { id: 1, current_stage: 'interview', name: 'Kareem Abdul-Jabbar', position: 'Angular', comments: 'doing well', tableConfig: {sortable: true}},


];

@Component({
  selector: 'brd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  data: any[] = [...DATA];
  hideName = false;
  loadingData = true;
  sort: INglDatatableSort = {key: 'current_stage', order: 'asc'};

  constructor() { }

  ngOnInit(): void {
  }

  onSort(event: INglDatatableSort) {
    console.log(event, 'sort');
  }

  onClickRow(event: INglDatatableRowClick) {

  }

}
