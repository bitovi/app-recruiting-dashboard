import {Component} from '@angular/core';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  opened = false;
  date: Date = new Date();

  constructor() {
  }

}
