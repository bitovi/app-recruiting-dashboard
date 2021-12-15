import { TemplateRef } from '@angular/core';

interface TableConfig {
  heading: string;
  template?: TemplateRef<any>;
  key: string;
  truncate: boolean;
  sortable: boolean;
  headClass?: string;
  cellClass?: string;
}

export interface DataTable {
  id: string;
  current_stage?: string;
  name?: string;
  position?: string;
  comments?: string;
  tableConfig?: Partial<TableConfig>;
}
