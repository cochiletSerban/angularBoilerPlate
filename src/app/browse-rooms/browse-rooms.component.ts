import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.component.html',
  styleUrls: ['./browse-rooms.component.css']
})
export class BrowseRoomsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToBr() {
    this.router.navigate(['/room-layout']);
  }

  goToMk() {
    this.router.navigate(['/make-reservations']);
  }
}
