import { TestBed } from '@angular/core/testing';

import { PemdaService } from './pemda.service';

describe('PemdaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PemdaService = TestBed.get(PemdaService);
    expect(service).toBeTruthy();
  });
});
