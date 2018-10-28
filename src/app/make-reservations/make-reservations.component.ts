import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { MaterializeAction } from 'angular2-materialize';
import { GetReservationsService } from '../services/get-reservations.service';
import { GetRoomsService } from '../services/get-rooms.service';
import { Reservation } from '../models/reservation';
import { Room } from '../models/room';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-reservations',
  templateUrl: './make-reservations.component.html',
  styleUrls: ['./make-reservations.component.css']
})
export class MakeReservationsComponent implements OnInit {

  workingHours = [
    {
      id: 1,
      hour:"08:00"
    },
    {
      id: 2,
      hour:"09:00"
    },
    {
      id: 3,
      hour:"10:00"
    },
    {
      id: 4,
      hour:"11:00"
    },
    {
      id: 5,
      hour:"12:00"
    },
    {
      id: 6,
      hour:"13:00"
    },
    {
      id: 7,
      hour:"14:00"
    },
    {
      id: 8,
      hour:"15:00"
    },
    {
      id: 9,
      hour:"16:00"
    },
    {
      id: 10,
      hour:"17:00"
    },
    {
      id: 11,
      hour:"18:00"
    },
    {
      id: 12,
      hour:"19:00"
    },
    {
      id: 13,
      hour:"20:00"
    }
  ];

  calendarForm: FormGroup;
  reservationForm: FormGroup;
  roomForm: FormGroup;
  roomFilterForm: FormGroup;
  date = '2018-10-28';
  params = [{ format: 'yyyy-mm-dd'}];
  actions = new EventEmitter<string|MaterializeAction>();
  roomTypes = ['All', 'Video', 'Scrum', 'Enterprise'];
  roomFloors = ['All', 0, 1, 2, 3];
  reservations: Reservation[] = [];
  rooms: Room[];
  startHourForm: FormGroup;
  endHourForm: FormGroup;
  startingHours = [];
  endingHours = [];

  constructor(private _getReservationsService: GetReservationsService,
     private _getRoomService: GetRoomsService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.calendarForm = new FormGroup({
      'calendar': new FormControl(null, this.dateValidator.bind(this))
    });
    this.roomFilterForm = new FormGroup({
      'roomName': new FormControl(''),
      'capacity': new FormControl([0]),
      'roomTypeForm': new FormControl('ALL'),
      'roomFloorForm': new FormControl('All')
    });
    this.roomForm = new FormGroup({
      'room': new FormControl('All')
    });
    this.startHourForm = new FormGroup({
      'startHour': new FormControl(null, Validators.required)
    });
    this.startHourForm.get('startHour').valueChanges.subscribe(value => {
      this.endingHours = [];
      let stillAdd = true;
      this.workingHours.forEach(workingHour => {
        if (workingHour.id > value) {
          if (!this.isRoomReserved(this.roomForm.get('room').value, workingHour.id - 1) && stillAdd) {
            this.endingHours.push(workingHour);
          } else {
            stillAdd = false;
          }
        }
      });
      this.endHourForm.get('endHour').setValue(null);
    });
    this.endHourForm = new FormGroup({
      'endHour': new FormControl(null, Validators.required)
    });
    this.roomFilterForm.valueChanges.subscribe(data => this.filterRooms());
    this.roomForm.get('room').valueChanges.subscribe(data => this.selectRoom());

    this._route.queryParamMap.subscribe(params => {
      if (params.get('room')) {
        this.roomForm.get('room').setValue(params.get('room'));
      }
    });
  }

  dateChanged() {
    console.log(this.date);
    if (this.date) {
      this.filterRooms();
      this.getReservations();
    }
  }

  filterRooms() {
    if (this.date) {
    this._getRoomService.getRooms(
      this.roomFilterForm.get('roomName').value,
      this.roomFilterForm.get('capacity').value,
      this.roomFilterForm.get('roomFloorForm').value === 'All' ? null : this.roomFilterForm.get('roomFloorForm').value,
      this.roomFilterForm.get('roomTypeForm').value === 'ALL' ? null : this.roomFilterForm.get('roomTypeForm').value).subscribe(data => {
        console.log(data);
        this.rooms = data._embedded.room;
      });
    }
  }

  selectRoom() {
    this.getReservations();
  }

  getReservations() {
    let roomName = null;
    if (this.roomForm.get('room').value !== 'All') {
      roomName = this.roomForm.get('room').value;
    }
    this._getReservationsService.getReservations(this.date,
      null, roomName, null, null, null, null, null).subscribe(resp => {
      this.reservations = resp._embedded ? resp._embedded.reservation : [];
      if (this.roomForm.get('room').value !== 'All') {
        this.startingHours = [];
        this.startHourForm.get('startHour').setValue(null);
        this.startHourForm.get('startHour').updateValueAndValidity();
        this.endHourForm.get('endHour').setValue(null);
        this.workingHours.forEach(workingHour => {
          if (!this.isRoomReserved(this.roomForm.get('room').value, workingHour.id)) {
            this.startingHours.push(workingHour);
          }
        });
      }
    });
  }

  dateValidator(control: FormControl): {[s: string]: boolean} {
    if (!this.date) {
      return {'dateNotValid': true};
    }
    return null;
  }

  isRoomReserved(room, workingHour): boolean {
    let reserved = false;
    this.reservations.forEach(reservation => {
      if (reservation.roomData.name === room && workingHour >= reservation.startTime && workingHour < reservation.endTime) {
        reserved = true;
      }
    });
    return reserved;
  }

  saveReservation() {
    this._getReservationsService.saveReservation(this.date, localStorage.getItem('email'),
      this.roomForm.get('room').value, this.startHourForm.get('startHour').value, this.endHourForm.get('endHour').value)
      .subscribe(data => {
        this.getReservations();
      });
  }
}
