import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from 'src/app/core/interfaces';
import { JobsStore } from 'src/app/dashboard/store/jobs.store';
import { WidgetFilterSelectJob } from '../../widget.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'brd-filter-select-job',
  templateUrl: './filter-select-job.component.html',
  styleUrls: ['./filter-select-job.component.scss'],
})
export class FilterSelectJobComponent implements FilterComponent {
  @Input() filter: WidgetFilterSelectJob;
  @Input() isLoading$: Observable<boolean> = this.jobsStore.loading$;

  @Output() changed = new EventEmitter<WidgetFilterSelectJob>();
  readonly jobs$: Observable<string[]> = this.jobsStore.jobs$.pipe(
    map((jobs: Job[]) => jobs.map((job) => job.title))
  );

  constructor(private readonly jobsStore: JobsStore) {}

  public onItemSelected(items: string[]): void {
    this.changed.emit({
      ...this.filter,
      value: [...items],
    });
  }
}
