import { TestBed } from '@angular/core/testing';

import { SalesCategoryService } from './sales-category.service';

describe('SalesCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesCategoryService = TestBed.get(SalesCategoryService);
    expect(service).toBeTruthy();
  });
});
