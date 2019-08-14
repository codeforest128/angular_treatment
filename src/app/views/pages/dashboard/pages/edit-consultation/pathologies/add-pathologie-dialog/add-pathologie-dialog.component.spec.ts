import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPathologieDialogComponent } from './add-pathologie-dialog.component';

describe('AddPathologieDialogComponent', () => {
  let component: AddPathologieDialogComponent;
  let fixture: ComponentFixture<AddPathologieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPathologieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPathologieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
