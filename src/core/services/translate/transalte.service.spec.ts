import { TestBed } from '@angular/core/testing';

import { TransalteService } from './transalte.service';

describe('TransalteService', () => {
  let service: TransalteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransalteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
