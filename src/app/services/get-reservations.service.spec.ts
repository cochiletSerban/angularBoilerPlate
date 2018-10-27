import { TestBed, inject } from '@angular/core/testing';

import { GetReservationsService } from './get-reservations.service';

describe('GetReservationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetReservationsService]
    });
  });

  it('should be created', inject([GetReservationsService], (service: GetReservationsService) => {
    expect(service).toBeTruthy();
  }));
});
