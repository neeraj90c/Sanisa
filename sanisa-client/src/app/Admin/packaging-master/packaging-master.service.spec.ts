import { TestBed } from '@angular/core/testing';

import { PackagingMasterService } from './packaging-master.service';

describe('PackagingMasterService', () => {
  let service: PackagingMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagingMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
