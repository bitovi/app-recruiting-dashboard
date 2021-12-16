import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

export interface BarChartDataSet {
  data: number[];
  labels: string[][];
}

@Component({
  selector: 'brd-dashboard-bar-chart',
  templateUrl: './dashboard-bar-chart.component.html',
  styleUrls: ['./dashboard-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBarChartComponent implements OnChanges {
  @Input() dataSet: BarChartDataSet = { data: [], labels: [] };

  barChartData: ChartData = {
    datasets: [],
    labels: [],
  };
  barChartOptions: ChartOptions = {
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
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  ngOnChanges() {
    if (this.dataSet.data) {
      this.barChartData = {
        datasets: [
          {
            data: this.dataSet.data,
            label: 'No Of Active Applicant',
            borderWidth: 1,
            backgroundColor: ['#17a0db'],
            borderColor: ['#013b56'],
            hoverBackgroundColor: ['#1482b8'],
            hoverBorderColor: ['#013b56'],
          },
        ],
        labels: this.dataSet.labels,
      };
    }
  }
}
