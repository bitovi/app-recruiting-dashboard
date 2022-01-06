import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFilterWidgetComponent } from './page-filter-widget.component';

describe('PageFilterWidgetComponent', () => {
  let component: PageFilterWidgetComponent;
  let fixture: ComponentFixture<PageFilterWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageFilterWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFilterWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
