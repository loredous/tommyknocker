import { TestBed } from '@angular/core/testing';

import { ControllerApiService } from './controller-api.service';

describe('ControllerApiService', () => {
  let service: ControllerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
