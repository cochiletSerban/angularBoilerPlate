import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-layout',
  templateUrl: './rooms-layout.component.html',
  styleUrls: ['./rooms-layout.component.css']
})
export class RoomsLayoutComponent implements OnInit {

  constructor(private route:Router) {
   }

  ngOnInit() {
  }

  navigateTo(roomName) {
    this.route.navigate(['/make-reservations'], { queryParams: { room: roomName }})
  }

}
