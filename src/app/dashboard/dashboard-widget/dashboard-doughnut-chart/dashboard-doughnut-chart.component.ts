import {Component} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'brd-dashboard-doughnut-chart',
  templateUrl: './dashboard-doughnut-chart.component.html',
  styleUrls: ['./dashboard-doughnut-chart.component.scss']
})
export class DashboardDoughnutChartComponent {

  colorScheme: string[] = [
    'rgb(0, 93, 185, 1)',
    'rgb(41, 180, 32, 1)',
    'rgb(255, 159, 64)',
    'rgb(145, 92, 206, 1)',
    'rgb(202, 80, 156, 1)',
    'rgb(85, 191, 202, 1)',
    'rgb(202, 80, 80, 1)',
    'rgb(119, 119, 119, 1)'];

  doughnutDataSets: ChartDataset[] = [
    {
      data: [28, 48, 63, 44, 100],
      label: 'No Of Applicant',
      borderColor: this.colorScheme,
      backgroundColor: this.colorScheme
    }
  ];

  doughnutOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Recruiting Stage Exited'
        },
        position: 'top',
      }
    },
  };

  labels: string[] = ['Resume', 'Round 1', 'Round 2', 'Round 3', 'Final Interview'];
  doughnutChartType: ChartType = 'doughnut';
  barChartLegend = true;

  doughnutChartData: ChartData = {
    datasets: this.doughnutDataSets,
    labels: this.labels,
  }

}
