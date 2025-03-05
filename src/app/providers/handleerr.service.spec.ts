import { TestBed } from '@angular/core/testing';

import { HandleerrService } from './handleerr.service';

describe('HandleerrService', () => {
  let service: HandleerrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleerrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
