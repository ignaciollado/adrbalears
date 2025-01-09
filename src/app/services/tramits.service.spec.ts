import { TestBed } from '@angular/core/testing';

import { TramitsService } from './tramits.service';

describe('TramitsService', () => {
  let service: TramitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
