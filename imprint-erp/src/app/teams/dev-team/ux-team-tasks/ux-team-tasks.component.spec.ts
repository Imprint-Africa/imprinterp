import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UxTeamTasksComponent } from './ux-team-tasks.component';

describe('UxTeamTasksComponent', () => {
  let component: UxTeamTasksComponent;
  let fixture: ComponentFixture<UxTeamTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UxTeamTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UxTeamTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
