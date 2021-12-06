import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions, ChartType} from 'chart.js';

@Component({
  selector: 'brd-dashboard-bar-chart',
  templateUrl: './dashboard-bar-chart.component.html',
  styleUrls: ['./dashboard-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardBarChartComponent implements OnInit {

  barChartDataSets: ChartDataset[] = [
    {
      data: [28, 48, 12, 63, 34, 44, 100],
      label: 'No Of Active Applicant',
      borderWidth: 1, backgroundColor: ['#17a0db'],
      borderColor: ['#013b56'], hoverBackgroundColor: ['#1482b8'],
      hoverBorderColor: ['#013b56'],
    }
  ];

  labels: string[] = ['Node Developer', 'Angular Consultant'
    , 'React Consultant', 'Javascript Developer',
    'Devops Engineer', 'Marketing Coordinator',
    'Project Manager'];

  barChartData: ChartData = {
    datasets: this.barChartDataSets,
    labels: this.labels,
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Job Openings',
        }
      },
    },
  }
  barChartType: ChartType = 'bar';

  barChartLegend = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
