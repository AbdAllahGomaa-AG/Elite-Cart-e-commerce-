import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginguardesGuard } from './loginguardes.guard';

describe('loginguardesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginguardesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
