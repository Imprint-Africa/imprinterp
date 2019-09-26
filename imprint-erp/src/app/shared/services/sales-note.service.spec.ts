import { TestBed } from '@angular/core/testing';

import { SalesNoteService } from './sales-note.service';

describe('SalesNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesNoteService = TestBed.get(SalesNoteService);
    expect(service).toBeTruthy();
  });
});
