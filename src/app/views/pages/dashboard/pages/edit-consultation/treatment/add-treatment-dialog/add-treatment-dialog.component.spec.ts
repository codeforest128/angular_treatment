import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreatmentDialogComponent } from './add-treatment-dialog.component';

describe('AddTreatmentDialogComponent', () => {
  let component: AddTreatmentDialogComponent;
  let fixture: ComponentFixture<AddTreatmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTreatmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTreatmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
