import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SSPIComponent } from './sspi.component';

describe('SSPIComponent', () => {
  let component: SSPIComponent;
  let fixture: ComponentFixture<SSPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SSPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SSPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
