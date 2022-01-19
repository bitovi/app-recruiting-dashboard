import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { map } from 'rxjs/operators';
import { ApplicantsBySourceStore } from '../../store/applicants-by-source.store';
import { DefaultWidgetComponent } from '../default-widget.component';

@Component({
  selector: 'brd-widget-applicants-by-source',
  templateUrl: './widget-applicants-by-source.component.html',
  styleUrls: ['./widget-applicants-by-source.component.scss'],
  providers: [ApplicantsBySourceStore],
})
export class WidgetApplicantsBySourceComponent
  extends DefaultWidgetComponent
  implements OnInit
{
  readonly data$ = this.applicantsBySourceStore.applicantsBySource$.pipe(
    map((applicantsBySourceData) => {
      const labels = applicantsBySourceData.map(
        (applicantsBySource) => applicantsBySource.source
      );
      const data = applicantsBySourceData.map(
        (applicantsBySource) => applicantsBySource.total
      );
      return {
        labels,
        datasets: [
          {
            data,
            label: 'Applicants',
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
  readonly loading$ = this.applicantsBySourceStore.loadingApplicantsBySource$;

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
          text: 'Applicants by Source',
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  constructor(
    private readonly applicantsBySourceStore: ApplicantsBySourceStore
  ) {
    super();
  }

  ngOnInit(): void {
    this.applicantsBySourceStore.setId(this.id);
  }
}
