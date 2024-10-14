import { TestBed } from '@angular/core/testing';

import { ImageMasterService } from './image-master.service';

describe('ImageMasterService', () => {
  let service: ImageMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
