import { TestBed } from '@angular/core/testing';

import { UnleashService } from './unleash.service';

describe('UnleashService', () => {
  let service: UnleashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnleashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
