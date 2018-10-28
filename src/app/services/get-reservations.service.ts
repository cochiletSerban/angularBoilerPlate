import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetReservationsService  {

  constructor(private _http : HttpClient) { }

  getReservations (date:string, email:string, roomName:string, startTime:number, endTime:number, capacity:number, floor:number, roomType:string): Observable<any>{
    let queryParam = new HttpParams().set('page', '0');
    console.log(roomName);
    if (date != null)
      queryParam = queryParam.append('date', date);
    if (email != null)
      queryParam = queryParam.append('email', email);
    if (roomName != null)
      queryParam = queryParam.append('roomName', roomName);
    if (startTime != null)
      queryParam = queryParam.append('startTime', startTime.toString());
    if (endTime != null)
      queryParam = queryParam.append('endTime', endTime.toString());
    if (capacity != null)
      queryParam = queryParam.append('capacity', capacity.toString());
    if (floor != null)
      queryParam = queryParam.append('floor', floor.toString());
    if (roomType != null)
      queryParam = queryParam.append('roomType', roomType);
    return this._http.get<any>(environment.apiUrl + '/reservation/findBy', {params : queryParam});
  }

  saveReservation(date: string, email: string, roomName: string, startTime: number, endTime: number) {
    let queryParam = new HttpParams().set('email', email); // replace with user email
    queryParam = queryParam.append('date', date);
    queryParam = queryParam.append('roomName', roomName);
    queryParam = queryParam.append('startTime', startTime.toString());
    queryParam = queryParam.append('endTime', endTime.toString());
    console.log(queryParam);
    return this._http.request<any>('post', environment.apiUrl + '/reservation/add', {params : queryParam});
  }

}
