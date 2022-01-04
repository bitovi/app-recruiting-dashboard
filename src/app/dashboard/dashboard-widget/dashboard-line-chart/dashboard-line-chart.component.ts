import { Component, Input, OnChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'brd-dashboard-line-chart',
  templateUrl: './dashboard-line-chart.component.html',
  styleUrls: ['./dashboard-line-chart.component.scss'],
})
export class DashboardLineChartComponent implements OnChanges {
  // x: Date.parse(yyyy-mm-dd), y: amount of applicants
  @Input() public dataSet: { x: number; y: number }[] = [];

  public lineChartType: ChartType = 'line';
  public barChartLegend = true;
  public lineChartData: ChartData = {
    datasets: [],
    labels: [],
  };
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

  public ngOnChanges() {
    if (this.dataSet.length) {
      const startDatasetDate: number = this.dataSet[0].x;
      const startDate: Date = isNaN(startDatasetDate)
        ? new Date()
        : new Date(startDatasetDate);

      const endDatasetDate: number = this.dataSet[this.dataSet.length - 1].x;
      const endDate: Date = isNaN(endDatasetDate)
        ? new Date()
        : new Date(endDatasetDate);

      this.lineChartData = {
        datasets: [
          {
            data: [...this.dataSet],
            label: 'Applicants',
            tension: 0.1,
            borderColor: 'rgb(75, 192, 192)',
            pointBackgroundColor: 'rgb(75, 192, 192)',
            pointHoverBackgroundColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
          },
        ],
        labels: this.generateLabelsByFilters(startDate, endDate),
      };
    }
  }

  private generateLabelsByFilters(startDate: Date, endDate: Date): string[] {
    return [startDate.toISOString(), endDate.toISOString()];
  }
}
