import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SSPIHeaderComponent } from './sspi-header.component';

describe('SSPIHeaderComponent', () => {
  let component: SSPIHeaderComponent;
  let fixture: ComponentFixture<SSPIHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SSPIHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SSPIHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
