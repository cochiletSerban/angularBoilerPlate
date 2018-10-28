import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from '../models/reservation';
import { GetReservationsService } from '../services/get-reservations.service';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {


  @Input() workingHours: any[] = [];
  @Input() reservations: Reservation[] = [];

  constructor(private _getReservationService : GetReservationsService) { }

  ngOnInit() {
  }

  isStartReservation (hour) {
    if (this.reservations !== undefined) {
      for (let reservation of this.reservations) {
        if (reservation.startTime === hour) {
          return true;
        }
      }
    }
  }

  deleteReservations (hour) {
    let reser;
    if (this.reservations !== undefined) {     
      for (let reservation of this.reservations) {
        if (reservation.startTime === hour) {
          reser = reservation;
        }
      }
    }
    let pos = this.reservations.indexOf(reser);
    this._getReservationService.deleteReservation(reser.date, reser.userData.email, reser.roomData.name, reser.startTime, reser.endTime).subscribe(resp => {
      for (let i = reser.startTime; i < reser.endTime; i++) {
        this.workingHours[i-1].reserved = false;
      }
      this.reservations.splice(pos,1);
    })
  }
}
