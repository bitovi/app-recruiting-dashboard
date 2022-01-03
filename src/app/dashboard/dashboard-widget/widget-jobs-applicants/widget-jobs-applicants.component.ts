import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { map } from 'rxjs/operators';
import { LabelToArrayPipe } from '../../shared/pipe/label-to-array.pipe';
import { ChartsStore } from '../../store/charts.store';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'brd-widget-jobs-applicants',
  templateUrl: './widget-jobs-applicants.component.html',
  styleUrls: ['./widget-jobs-applicants.component.scss'],
})
export class WidgetJobsApplicantsComponent implements WidgetComponent {
  readonly data$ = this.chartsStore.jobsApplicants$.pipe(
    map((jobsApplicantsData) => {
      const labels = jobsApplicantsData.map((jobApplicant) =>
        this.labelToArrayPipe.transform(jobApplicant.jobTitle, 2)
      );
      const data = jobsApplicantsData.map((jobApplicant) => jobApplicant.total);
      return {
        labels,
        datasets: [
          {
            data,
            label: 'No Of Active Applicant',
            borderWidth: 1,
            backgroundColor: ['#17a0db'],
            borderColor: ['#013b56'],
            hoverBackgroundColor: ['#1482b8'],
            hoverBorderColor: ['#013b56'],
          },
        ],
      };
    })
  );
  readonly loading$ = this.chartsStore.loadingJobsApplicants$;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          callback: function (value: number | string, index: number) {
            return this.getLabelForValue(index);
          },
        },
      },
    },
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Job Openings',
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  constructor(
    private readonly chartsStore: ChartsStore,
    private labelToArrayPipe: LabelToArrayPipe
  ) {}
}
