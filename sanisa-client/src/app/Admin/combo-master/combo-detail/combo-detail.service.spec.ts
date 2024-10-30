import { TestBed } from '@angular/core/testing';

import { ComboDetailService } from './combo-detail.service';

describe('ComboDetailService', () => {
  let service: ComboDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComboDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
