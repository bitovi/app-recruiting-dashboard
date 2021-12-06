import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'brd-dashboard-line-chart',
  templateUrl: './dashboard-line-chart.component.html',
  styleUrls: ['./dashboard-line-chart.component.scss']
})
export class DashboardLineChartComponent {
  dataSet = [{
    x: Date.parse('2021-08-21'),
    y: 6
  },
    {
      x: Date.parse('2021-08-27'),
      y: 103
    },
    {
      x: Date.parse("2021-09-6"),
      y: 70
    },
    {
      x: Date.parse("2021-09-18"),
      y: 30
    },
    {
      x: Date.parse("2021-09-19"),
      y: 60
    },
    {
      x: Date.parse("2021-09-20"),
      y: 50
    },
    {
      x: Date.parse("2021-09-21"),
      y: 70
    }
  ];
  lineDataSets: ChartDataset[] = [
    { data: [...this.dataSet],
      label: 'Applicants',
      tension: 0.1,
      borderColor: 'rgb(75, 192, 192)',
      pointBackgroundColor:  'rgb(75, 192, 192)',
      pointHoverBackgroundColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(75, 192, 192)',
    }
  ];
  labels: string[] = this.generateLabelsByFilters( new Date('2021-08-21'), new Date());

  lineChartType: ChartType = 'line';
  barChartLegend = true;

  lineChartData : ChartData = {
    datasets: this.lineDataSets,
    labels: this.labels
  }

  lineOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          // tooltipFormat: "LL"
        },
        title: {
          display: true,
          text: 'Days',
        },
        ticks: {
          autoSkip: false,
        }
      },
      y: {
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Status Of Applicants',
        }
      }
    },
  }

  @ViewChild(BaseChartDirective) lineChart?: BaseChartDirective;

  generateLabelsByFilters(startDate: Date, endDate: Date): string[] {
    // const end = moment(endDate, 'YYYY-MM-DD');
    // const start = moment(startDate, 'YYYY-MM-DD');
    // const diff = end.diff(start, "month");
    // if(diff < 1) {
    //   // change config setting to months
    //   console.log('config to months', diff);
    // } else {
    //   //  days difference
    //   setTimeout(() => {
    //     this.lineOptions.scales = {
    //       x: {
    //         type: 'time',
    //         time: {
    //           unit: 'month',
    //           tooltipFormat: "LL"
    //         },
    //         title: {
    //           display: true,
    //           text: 'Days',
    //         }
    //       },
    //     }
    //     this.lineChart?.chart?.data.datasets[0].data.push(...this.dataSet);
    //     this.lineChart?.chart?.update();
    //     console.log(this.lineChart?.chart?.data, 'rerender ===> ', this.lineChart?.chart?.data.datasets[0].data);
    //     console.log(this.lineChart?.chart, 'rerender ===> ');
    //   }, 3000);
    //
    //   console.log('config to days', diff);
    // }
    // return [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")];
    return [startDate.toISOString(), endDate.toISOString()];

  }

  convertDateToNumber() {

  }

}
