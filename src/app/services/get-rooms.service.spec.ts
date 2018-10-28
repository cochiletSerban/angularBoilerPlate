import { TestBed } from '@angular/core/testing';

import { GetRoomsService } from './get-rooms.service';

describe('GetRoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetRoomsService = TestBed.get(GetRoomsService);
    expect(service).toBeTruthy();
  });
});
