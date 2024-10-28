import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authgardsGuard } from './authgards.guard';

describe('authgardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authgardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
