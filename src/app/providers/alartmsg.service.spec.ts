import { TestBed } from '@angular/core/testing';

import { AlartmsgService } from './alartmsg.service';

describe('AlartmsgService', () => {
  let service: AlartmsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlartmsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
