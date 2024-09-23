import { TestBed } from '@angular/core/testing';

import { QuoteMasterService } from './quote-master.service';

describe('QuoteMasterService', () => {
  let service: QuoteMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
