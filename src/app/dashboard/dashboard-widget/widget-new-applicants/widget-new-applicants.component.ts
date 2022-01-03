import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartsStore } from '../../store/charts.store';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'brd-widget-new-applicants',
  templateUrl: './widget-new-applicants.component.html',
  styleUrls: ['./widget-new-applicants.component.scss'],
})
export class WidgetNewApplicantsComponent implements WidgetComponent {
  readonly data$: Observable<ChartData> = this.chartsStore.newApplicants$.pipe(
    map((newApplicants) =>
      newApplicants.map((data) => ({
        x: Date.parse(data.applyDate),
        y: data.total,
      }))
    ),
    map((data) => ({
      datasets: [
        {
          data: [...data],
          label: 'Applicants',
          tension: 0.1,
          borderColor: 'rgb(75, 192, 192)',
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointHoverBackgroundColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
        },
      ],
      labels:
        data.length > 0
          ? [
              new Date(data[0].x).toISOString(),
              new Date(data[data.length - 1].x).toISOString(),
            ]
          : [],
    }))
  );
  readonly loading$ = this.chartsStore.loadingNewApplicants$;

  public lineChartType: ChartType = 'line';
  public barChartLegend = true;
  public lineOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd',
        },
        title: {
          display: true,
          text: 'Days',
        },
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Status Of Applicants',
        },
      },
    },
  };

  constructor(private readonly chartsStore: ChartsStore) {}
}
