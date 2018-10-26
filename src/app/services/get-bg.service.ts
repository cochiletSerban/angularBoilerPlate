import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BgArray } from '../objects/BgArray';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class GetBgService {
  getBgUrl = 'http://piky.herokuapp.com/jessica';
  constructor(private http : HttpClient) { }
  getBg(): Observable<BgArray>{
    return this.http.get<BgArray>(this.getBgUrl);
  }
}
