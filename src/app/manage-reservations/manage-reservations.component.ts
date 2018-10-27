import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css']
})
export class ManageReservationsComponent implements OnInit {
  date = ''
  constructor(private router:Router) { 

  }

  ngOnInit(){
  }

  goToSee() {
    this.router.navigate(['user-reservations']);
  }

  goToPick() {
    this.router.navigate(['browse-rooms']);
  }







}
