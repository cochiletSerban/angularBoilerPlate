import { TestBed, inject } from '@angular/core/testing';

import { GetBgService } from './get-bg.service';

describe('GetBgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBgService]
    });
  });

  it('should be created', inject([GetBgService], (service: GetBgService) => {
    expect(service).toBeTruthy();
  }));
});
