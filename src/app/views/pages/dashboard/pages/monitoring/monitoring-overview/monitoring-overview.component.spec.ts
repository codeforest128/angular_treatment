import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringOverviewComponent } from './monitoring-overview.component';

describe('MonitoringOverviewComponent', () => {
  let component: MonitoringOverviewComponent;
  let fixture: ComponentFixture<MonitoringOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
