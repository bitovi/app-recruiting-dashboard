import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { map } from 'rxjs/operators';
import { ChartsStore } from '../../store/charts.store';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'brd-recruiting-stage-exited',
  templateUrl: './widget-recruiting-stage-exited.component.html',
  styleUrls: ['./widget-recruiting-stage-exited.component.scss'],
})
export class WidgetRecruitingStageExitedComponent implements WidgetComponent {
  readonly data$ = this.chartsStore.recruitingStageExited$.pipe(
    map((recruitingStageExitedResponse) => ({
      datasets: [
        {
          data: recruitingStageExitedResponse.map((value) => value.total),
          label: 'No. of Applicants',
          borderColor: this.colorScheme,
          backgroundColor: this.colorScheme,
        },
      ],
      labels: recruitingStageExitedResponse.map((value) => value.stage),
    }))
  );
  readonly loading$ = this.chartsStore.loadingRecruitingStageExited$;

  public doughnutOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Recruiting Stage Exited',
        },
        position: 'top',
      },
    },
  };
  public doughnutChartType: ChartType = 'doughnut';
  public barChartLegend = true;

  // TODO: create enum for colors
  private colorScheme: string[] = [
    'rgb(0, 93, 185, 1)',
    'rgb(41, 180, 32, 1)',
    'rgb(255, 159, 64)',
    'rgb(145, 92, 206, 1)',
    'rgb(202, 80, 156, 1)',
    'rgb(85, 191, 202, 1)',
    'rgb(202, 80, 80, 1)',
    'rgb(119, 119, 119, 1)',
  ];

  constructor(private readonly chartsStore: ChartsStore) {}
}
