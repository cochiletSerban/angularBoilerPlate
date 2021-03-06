import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../objects/User';
import 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoginResponse } from '../objects/loginResponse';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  token: string;
  userStatus = false;

  constructor(private http:HttpClient) {}

  isLogedIn() {
    if ( localStorage.getItem('token') !=null )
      this.userStatus = true;
    else this.userStatus = false;
    return this.userStatus;
  }

  register(user:User){
   return this.http.post(environment.apiUrl + '/register', user);
  }

  private logUser(token, user){
    this.userStatus = true;
    this.token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('email', user.email);

    return this.userStatus;
  }

  login(user:User) {
    return this.http.post<LoginResponse>(environment.apiUrl + '/login', {email:user.email, password:user.password})
      .map(resp => this.logUser(resp.token, user))
  }

  logout(){
    if(this.isLogedIn) {
      localStorage.clear();
      this.token = null;
      this.userStatus = false;
    }
  }

}
