import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SpreadsheetComponent} from './../spreadsheet/spreadsheet.component';
import { FormGroup, FormControl } from "@angular/forms";
declare var $: any;

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {

  date : '';
  constructor () {}

  ngOnInit(){
  }

  dataChange() {
    console.log("CCeva");
    $('.btn-flat .picker__close .waves-effect').click(function () {
      console.log(this.date);
    });
  }
}


