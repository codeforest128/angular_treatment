import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulatoryComponent } from './ambulatory.component';

describe('AmbulatoryComponent', () => {
  let component: AmbulatoryComponent;
  let fixture: ComponentFixture<AmbulatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbulatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
