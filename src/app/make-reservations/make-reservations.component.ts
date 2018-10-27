import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-make-reservations',
  templateUrl: './make-reservations.component.html',
  styleUrls: ['./make-reservations.component.css']
})
export class MakeReservationsComponent implements OnInit {

  reservationForm: FormGroup;
  date = '';
  params = [{ format: 'yyyy-mm-dd'}];
  actions = new EventEmitter<string|MaterializeAction>();
  roomTypes = ['Video', 'Scrum', 'Enterprise'];
  roomFloors = [0, 1, 2, 3];

  constructor() { }

  ngOnInit() {
    this.reservationForm = new FormGroup({
      'calendar': new FormControl(null),
      'roomName': new FormControl(null),
      'roomTypeForm': new FormControl(['VIDEO']),
      'roomFloorForm': new FormControl([0]),
    });
  }

  dateChanged() {
    console.log(this.date);
  }

  onSubmit() {
    console.log(this.reservationForm);
  }

}
