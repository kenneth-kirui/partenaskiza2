import { TestBed } from '@angular/core/testing';

import { TuneserviceService } from './tuneservice.service';

describe('TuneserviceService', () => {
  let service: TuneserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuneserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
