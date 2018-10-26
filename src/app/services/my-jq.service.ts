import { Injectable } from '@angular/core';
import { ElementRef } from "@angular/core";

@Injectable()
export class MyJqService {
    constructor(private el:ElementRef){}
    q(query) {
        return this.el.nativeElement.querySelector(query);
    }
  }
