import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'brd-dashboard-doughnut-chart',
  templateUrl: './dashboard-doughnut-chart.component.html',
  styleUrls: ['./dashboard-doughnut-chart.component.scss'],
})
export class DashboardDoughnutChartComponent implements OnChanges {
  @Input() values: number[] = [];
  @Input() labels: string[] = [];

  colorScheme: string[] = [
    'rgb(0, 93, 185, 1)',
    'rgb(41, 180, 32, 1)',
    'rgb(255, 159, 64)',
    'rgb(145, 92, 206, 1)',
    'rgb(202, 80, 156, 1)',
    'rgb(85, 191, 202, 1)',
    'rgb(202, 80, 80, 1)',
    'rgb(119, 119, 119, 1)',
  ];

  doughnutOptions: ChartOptions = {
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

  doughnutChartType: ChartType = 'doughnut';
  barChartLegend = true;

  doughnutChartData: ChartData = {
    datasets: [{ data: [] }],
    labels: [],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.labels || changes.values) {
      this.doughnutChartData = {
        datasets: [
          {
            data: this.values,
            label: 'No Of Applicant',
            borderColor: this.colorScheme,
            backgroundColor: this.colorScheme,
          },
        ],
        labels: this.labels,
      };
    }
  }
}
