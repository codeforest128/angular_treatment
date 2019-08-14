import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsultationDialogComponent } from './create-consultation-dialog.component';

describe('CreateConsultationDialogComponent', () => {
  let component: CreateConsultationDialogComponent;
  let fixture: ComponentFixture<CreateConsultationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConsultationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConsultationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
