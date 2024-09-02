import { TestBed } from '@angular/core/testing';

import { AuthserviceEnfantService } from './authservice.enfant.service';


describe('AuthserviceEnfantService', () => {
  let service: AuthserviceEnfantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthserviceEnfantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
