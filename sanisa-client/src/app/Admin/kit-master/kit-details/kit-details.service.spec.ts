import { TestBed } from '@angular/core/testing';

import { KitDetailsService } from './kit-details.service';

describe('KitDetailsService', () => {
  let service: KitDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
