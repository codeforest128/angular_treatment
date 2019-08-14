import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalExamComponent } from './clinical-exam.component';

describe('ClinicalExamComponent', () => {
  let component: ClinicalExamComponent;
  let fixture: ComponentFixture<ClinicalExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
