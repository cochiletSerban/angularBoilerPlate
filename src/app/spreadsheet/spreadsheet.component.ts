import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {


  @Input() workingHours: any[] = [];
  @Input() reservations: Reservation[] = [];

  constructor() { }

  ngOnInit() {
  }

}
