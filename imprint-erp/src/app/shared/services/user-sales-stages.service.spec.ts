import { TestBed } from '@angular/core/testing';

import { UserSalesStagesService } from './user-sales-stages.service';

describe('UserSalesStagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSalesStagesService = TestBed.get(UserSalesStagesService);
    expect(service).toBeTruthy();
  });
});
