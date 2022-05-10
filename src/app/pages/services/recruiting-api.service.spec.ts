import { TestBed } from '@angular/core/testing';

import { RecruitingApiService } from './recruiting-api.service';

describe('RecruitingApiService', () => {
  let service: RecruitingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
