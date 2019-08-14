import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SSPIOverviewComponent } from './sspi-overview.component';

describe('SSPIOverviewComponent', () => {
  let component: SSPIOverviewComponent;
  let fixture: ComponentFixture<SSPIOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SSPIOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SSPIOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
