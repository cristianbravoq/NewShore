import { TestBed } from '@angular/core/testing';

import { InputRutesService } from './input-rutes.service';

describe('InputRutesService', () => {
  let service: InputRutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputRutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
