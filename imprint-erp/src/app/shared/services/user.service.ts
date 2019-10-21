import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class UserService {
 // tslint:disable: variable-name

// _url = 'http://localhost:3000/api/user/';
// _urlGetEmit = 'http://127.0.0.1:3000/';
_url = 'http://18.185.62.101:4201/api/user/';
_urlGetEmit = 'http://18.185.62.101:4201/';

private socket;


header = new HttpHeaders().set(
  'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
);

registrationHeader = new HttpHeaders().set(
  'Authorization', `Bearer ${window.localStorage.getItem('invitedUserToken')}`
);


  constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit);  }


loginUser( loginData: User ) {
  return this.http.post<any>(this._url + 'login', loginData);
}


registerUser( registrationData: User ) {
  return this.http.post<any>(this._url + 'register', registrationData, {headers : this.registrationHeader});
}


inviteUser(inviteData: any) {
  return this.http.post<any>(this._url + 'invite', inviteData, {headers : this.header});
}


listUsers() {
  return Observable.create((observer) => {
    this.socket.on('/listUsers', data => {
      observer.next(data);
    });
  });
}


getAllUsers() {
  return this.http.get<any>(this._url + 'getAll/', {headers : this.header});
}


getOneUser(id) {
  return this.http.get<any>(this._url + 'getOne/' + id, {headers : this.header});
}


updateUsers(id, data: any) {
  return this.http.put<any>(this._url + 'update/' + id, data, {headers : this.header});
}


deleteUser(id) {
  return this.http.delete<any>(this._url + 'delete/' + id, {headers : this.header});
}


//
}
//
