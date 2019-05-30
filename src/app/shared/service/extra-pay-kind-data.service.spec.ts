import { TestBed } from '@angular/core/testing';

import { ExtraPayKindDataService } from './extra-pay-kind-data.service';

describe('ExtraPayKindDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtraPayKindDataService = TestBed.get(ExtraPayKindDataService);
    expect(service).toBeTruthy();
  });
});
