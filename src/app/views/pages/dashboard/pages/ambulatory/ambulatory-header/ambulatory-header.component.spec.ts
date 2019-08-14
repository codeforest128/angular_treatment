import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulatoryHeaderComponent } from './ambulatory-header.component';

describe('AmbulatoryHeaderComponent', () => {
  let component: AmbulatoryHeaderComponent;
  let fixture: ComponentFixture<AmbulatoryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbulatoryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulatoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
