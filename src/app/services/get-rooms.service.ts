import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class GetRoomsService {

  constructor(private _http: HttpClient) { }

  getRooms(name: string, capacity: number, floor: number, roomType: string): Observable<any> {
    let queryParam = new HttpParams().set('page', '0');
    if (name != null) {
      queryParam = queryParam.append('name', name);
    }
    if (capacity != null) {
      queryParam = queryParam.append('capacity', capacity.toString());
    }
    if (floor != null) {
      queryParam = queryParam.append('floor', floor.toString());
    }
    if (roomType != null) {
      queryParam = queryParam.append('type', roomType);
    }
    return this._http.get<any>(environment.apiUrl + '/room/findBy', {params : queryParam});
  }
}
