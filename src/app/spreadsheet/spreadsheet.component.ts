import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {

  workingHours = [
  {
    id: 1,
    hour:"08:00",
    reserved: false
  },
  {
    id: 2,
    hour:"09:00",
    reserved: false
  },
  {
    id: 3,
    hour:"10:00",
    reserved: false
  },
  {
    id: 4,
    hour:"11:00",
    reserved: false
  },
  {
    id: 5,
    hour:"12:00",
    reserved: false
  },
  {
    id: 6,
    hour:"13:00",
    reserved: false
  },
  {
    id: 7,
    hour:"14:00",
    reserved: false
  },
  {
    id: 8,
    hour:"15:00",
    reserved: false
  },
  {
    id: 9,
    hour:"16:00",
    reserved: false
  },
  {
    id: 10,
    hour:"17:00",
    reserved: false
  },
  {
    id: 11,
    hour:"18:00",
    reserved: false
  },
  {
    id: 12,
    hour:"19:00",
    reserved: false
  },
  {
    id: 13,
    hour:"20:00",
    reserved: false
  }
];

  @Input() reservations: Reservation[];

  constructor() { }

  ngOnInit() {
  }

  isRoomReserved() {
    for (let reservation of this.reservations) {
      let start = reservation.startTime;
      let end = reservation.endTime;
      for (let i = start; i < end; i++) {
        console.log("Pula");
      }
    }
  }

}
