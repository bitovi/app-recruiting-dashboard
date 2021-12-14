import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPieChartComponent } from './dashboard-pie-chart.component';

describe('DashboardPieChartComponent', () => {
  let component: DashboardPieChartComponent;
  let fixture: ComponentFixture<DashboardPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPieChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
