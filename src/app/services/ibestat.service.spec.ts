import { TestBed } from '@angular/core/testing';

import { IbestatService } from './ibestat.service';

describe('IbestatService', () => {
  let service: IbestatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbestatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
