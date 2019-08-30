import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomServiceEditComponent } from './custom-service-edit.component';

describe('CustomServiceEditComponent', () => {
  let component: CustomServiceEditComponent;
  let fixture: ComponentFixture<CustomServiceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomServiceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
