import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBoardComponent } from './sales-board.component';

describe('SalesBoardComponent', () => {
  let component: SalesBoardComponent;
  let fixture: ComponentFixture<SalesBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
