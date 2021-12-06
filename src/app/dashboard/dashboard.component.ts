import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  opened = false;
  date: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
