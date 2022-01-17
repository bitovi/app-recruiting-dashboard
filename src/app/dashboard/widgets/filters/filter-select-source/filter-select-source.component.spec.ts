import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectSourceComponent } from './filter-select-source.component';

describe('FilterSelectSourceComponent', () => {
  let component: FilterSelectSourceComponent;
  let fixture: ComponentFixture<FilterSelectSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSelectSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
