import { TestBed, inject } from '@angular/core/testing';

import { MyJqService } from './my-jq.service';

describe('MyJqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyJqService]
    });
  });

  it('should be created', inject([MyJqService], (service: MyJqService) => {
    expect(service).toBeTruthy();
  }));
});
