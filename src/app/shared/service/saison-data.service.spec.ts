import { TestBed } from '@angular/core/testing';

import { SaisonDataService } from './saison-data.service';

describe('SaisonDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaisonDataService = TestBed.get(SaisonDataService);
    expect(service).toBeTruthy();
  });
});
