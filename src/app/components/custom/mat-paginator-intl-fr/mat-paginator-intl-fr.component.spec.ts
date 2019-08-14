import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginatorIntlFr } from './mat-paginator-intl-fr.component';

describe('MatPaginatorIntlFrComponent', () => {
  let component: MatPaginatorIntlFr;
  let fixture: ComponentFixture<MatPaginatorIntlFr>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatPaginatorIntlFr ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatPaginatorIntlFr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
