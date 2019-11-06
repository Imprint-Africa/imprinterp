import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { calenderEvent } from '../models/calenderEvent';


@Injectable({
  providedIn: 'root'
})


export class CalenderEventService {
    // tslint:disable: variable-name

// _url = 'http://localhost:3000/api/calenderEvents/';
// _urlGetEmit = 'http://127.0.0.1:3000/';
_url = 'http://18.185.62.101:4201/api/calenderEvents/';
_urlGetEmit = 'http://18.185.62.101:4201/';

private socket;



header = new HttpHeaders().set(
  'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
);



  constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit);  }




addCalenderEvent( event: calenderEvent ) {
  return this.http.post<any>(this._url + 'create', event, {headers : this.header});
}


listCalenderEvent() {
  return Observable.create((observer) => {
    this.socket.on('/listCalenderEvents', data => {
      observer.next(data);
    });
  });
}



getAllCalenderEvent() {
  return this.http.get<any>(this._url + 'getAll/', {headers : this.header});
}


getOneCalenderEvent(id) {
  return this.http.get<any>(this._url + 'getOne/' + id, {headers : this.header});
}


updateCalenderEvent(id, data: any) {
  return this.http.put<any>(this._url + 'update/' + id, data, {headers : this.header});
}


deleteCalenderEvent(id) {
  return this.http.delete<any>(this._url + 'delete/' + id, {headers : this.header});
}


}
