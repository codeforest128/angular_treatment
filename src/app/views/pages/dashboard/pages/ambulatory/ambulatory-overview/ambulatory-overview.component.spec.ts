import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulatoryOverviewComponent } from './ambulatory-overview.component';

describe('AmbulatoryOverviewComponent', () => {
  let component: AmbulatoryOverviewComponent;
  let fixture: ComponentFixture<AmbulatoryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbulatoryOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulatoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
