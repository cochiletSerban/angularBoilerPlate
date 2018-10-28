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
  workingHours = [
    {
      id: 1,
      hour:"08:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""

    },
    {
      id: 2,
      hour:"09:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 3,
      hour:"10:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 4,
      hour:"11:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 5,
      hour:"12:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 6,
      hour:"13:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 7,
      hour:"14:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 8,
      hour:"15:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 9,
      hour:"16:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 10,
      hour:"17:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 11,
      hour:"18:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 12,
      hour:"19:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    },
    {
      id: 13,
      hour:"20:00",
      reserved: false,
      room: "",
      floor: "",
      roomType: ""
    }
  ];
  backup : any [] = this.workingHours;

  constructor (private _getReservationService : GetReservationsService) {}

  ngOnInit(){
  }

  isRoomReserved() {
    if (this.reservations.length > 0) {
      for (let reservation of this.reservations) {
        let start = reservation.startTime;
        let end = reservation.endTime;
        for (let i = start; i < end; i++) {
          this.workingHours[i-1].reserved = true;
          this.workingHours[i-1].room = reservation.roomData.name;
          this.workingHours[i-1].floor = reservation.roomData.floor.toString();
          this.workingHours[i-1].roomType = reservation.roomData.type;
        }
      }
    }
    console.log(this.workingHours);
  }

  dateChange() {
    $("#pisat").val('');
    this._getReservationService.getReservations(this.date, null, null, null, null, null, null, null).subscribe(resp => {
      if (resp._embedded) {
        this.reservations = resp._embedded.reservation;
      } else {
        this.reservations = [];
      }
      for (let hour of this.workingHours) {
        hour.reserved = false;
      }
      this.isRoomReserved();
    })
  }
}


