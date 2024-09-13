import { TestBed } from '@angular/core/testing';

import { ComboMasterService } from './combo-master.service';

describe('ComboMasterService', () => {
  let service: ComboMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComboMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
