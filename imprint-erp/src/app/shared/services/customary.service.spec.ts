import { TestBed } from '@angular/core/testing';

import { CustomaryService } from './customary.service';

describe('CustomaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomaryService = TestBed.get(CustomaryService);
    expect(service).toBeTruthy();
  });
});
