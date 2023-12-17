import { TestBed } from '@angular/core/testing';

import { ChekoutServiceService } from './chekout-service.service';

describe('ChekoutServiceService', () => {
  let service: ChekoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChekoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
