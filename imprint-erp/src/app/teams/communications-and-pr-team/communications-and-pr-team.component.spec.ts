import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationsAndPrTeamComponent } from './communications-and-pr-team.component';

describe('CommunicationsAndPrTeamComponent', () => {
  let component: CommunicationsAndPrTeamComponent;
  let fixture: ComponentFixture<CommunicationsAndPrTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationsAndPrTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationsAndPrTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
