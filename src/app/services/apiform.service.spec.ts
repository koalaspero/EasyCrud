import { TestBed } from '@angular/core/testing';

import { ApiformService } from './apiform.service';

describe('ApiformService', () => {
  let service: ApiformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
