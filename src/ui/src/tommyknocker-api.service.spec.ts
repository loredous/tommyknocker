import { TestBed } from '@angular/core/testing';

import { TommyknockerAPIService } from './tommyknocker-api.service';

describe('TommyknockerAPIService', () => {
  let service: TommyknockerAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TommyknockerAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
