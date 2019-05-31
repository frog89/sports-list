import { TestBed } from '@angular/core/testing';

import { ExtraPayDataService } from './extra-pay-data.service';

describe('ExtraPayDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtraPayDataService = TestBed.get(ExtraPayDataService);
    expect(service).toBeTruthy();
  });
});
