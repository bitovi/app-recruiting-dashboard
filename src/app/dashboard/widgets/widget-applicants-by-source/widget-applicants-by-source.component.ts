import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { map } from 'rxjs/operators';
import { ChartsStore } from '../../store/charts.store';
import { DefaultWidgetComponent } from '../default-widget.component';

@Component({
  selector: 'brd-widget-applicants-by-source',
  templateUrl: './widget-applicants-by-source.component.html',
  styleUrls: ['./widget-applicants-by-source.component.scss'],
})
export class WidgetApplicantsBySourceComponent
  extends DefaultWidgetComponent
  implements OnInit
{
  readonly data$ = this.chartsStore.applicantsBySource$.pipe(
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
  readonly loading$ = this.chartsStore.loadingApplicantsBySource$;

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

  constructor(private readonly chartsStore: ChartsStore) {
    super();
  }

  ngOnInit(): void {
    this.chartsStore.setId(this.id);
  }
}
