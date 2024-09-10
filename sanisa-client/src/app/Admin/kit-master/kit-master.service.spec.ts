import { TestBed } from '@angular/core/testing';

import { KitMasterService } from './kit-master.service';

describe('KitMasterService', () => {
  let service: KitMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
