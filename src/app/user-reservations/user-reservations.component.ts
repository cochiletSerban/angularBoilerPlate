import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SpreadsheetComponent} from './../spreadsheet/spreadsheet.component';
import { FormGroup, FormControl } from "@angular/forms";
import { GetReservationsService } from "../services/get-reservations.service";
import { Reservation } from "../models/reservation";
declare var $: any;

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {

  date : '';
  reservations: Reservation[];
  constructor (private _getReservationService : GetReservationsService) {}

  ngOnInit(){
  }

  dateChange() {
    this._getReservationService.getReservations(this.date, null, null, null, null, null, null, null).subscribe(resp => {
      console.log(resp);
      this.reservations = resp._embedded.reservation;
    })
  }
}


