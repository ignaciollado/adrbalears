import { TestBed } from '@angular/core/testing';

import { IbemprenjoveService } from './ibemprenjove.service';

describe('IbemprenjoveService', () => {
  let service: IbemprenjoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbemprenjoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
