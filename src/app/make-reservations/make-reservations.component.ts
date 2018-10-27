import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { MaterializeAction } from 'angular2-materialize';
import { GetReservationsService } from '../services/get-reservations.service';
import { GetRoomsService } from '../services/get-rooms.service';
import { Reservation } from '../models/reservation';
import { Room } from '../models/room';

@Component({
  selector: 'app-make-reservations',
  templateUrl: './make-reservations.component.html',
  styleUrls: ['./make-reservations.component.css']
})
export class MakeReservationsComponent implements OnInit {

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

  constructor(private _getReservationsService: GetReservationsService, private _getRoomService: GetRoomsService) { }

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
  }

  dateChanged() {
    console.log(this.date);
    if (this.date) {
      this.filterRooms();
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
    this._getReservationsService.getReservations(this.date,
       this.roomForm.get('room').value === 'All' ? null : this.roomForm.get('room').value,
       null, null, null, null, null, null).subscribe(resp => {
      console.log(resp);
      this.reservations = resp._embedded.reservation;
    });
  }

  dateValidator(control: FormControl): {[s: string]: boolean} {
    if (!this.date) {
      return {'dateNotValid': true};
    }
    return null;
  }

}
