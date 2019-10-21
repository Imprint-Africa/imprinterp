import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { oppProject} from '../models/opportunity';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class SalesService {
 // tslint:disable: variable-name

_url = 'http://localhost:3000/api/opps/';
_urlGetEmit = 'http://127.0.0.1:3000/';
// _url = 'http://18.185.62.101:4201/api/opps/';
// _urlGetEmit = 'http://18.185.62.101:4201/';

private socket;


header = new HttpHeaders().set(
  'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
);

  constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit);  }


addOppProject( oppProjectsData: oppProject ) {
  return this.http.post<any>(this._url + 'create', oppProjectsData, {headers : this.header});
}


listOppProject() {
  return Observable.create((observer) => {
    this.socket.on('/listOppProjects', data => {
      observer.next(data);
    });
  });
}


getAllOppProject() {
  return this.http.get<any>(this._url + 'getAll/', {headers : this.header});
}


getOppProject(id) {
  return this.http.get<any>(this._url + 'getOne/' + id, {headers : this.header});
}


updateOppProject(id, data: any) {
  return this.http.put<any>(this._url + 'update/' + id, data, {headers : this.header});
}


deleteOppProject(id) {
  return this.http.delete<any>(this._url + 'delete/' + id, {headers : this.header});
}


}
