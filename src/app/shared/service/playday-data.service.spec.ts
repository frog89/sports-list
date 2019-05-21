import { TestBed } from '@angular/core/testing';

import { PlaydayDataService } from './playday-data.service';

describe('PlaydayDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaydayDataService = TestBed.get(PlaydayDataService);
    expect(service).toBeTruthy();
  });
});
