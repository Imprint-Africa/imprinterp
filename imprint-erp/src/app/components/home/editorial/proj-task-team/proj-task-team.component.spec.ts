import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjTaskTeamComponent } from './proj-task-team.component';

describe('ProjTaskTeamComponent', () => {
  let component: ProjTaskTeamComponent;
  let fixture: ComponentFixture<ProjTaskTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjTaskTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjTaskTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
