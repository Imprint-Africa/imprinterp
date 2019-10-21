import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Client } from '../models/client';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ClientService {
  // tslint:disable: variable-name

  // _url = 'http://localhost:3000/api/clients/';
  // _urlGetEmit = 'http://127.0.0.1:3000/';
  _url = 'http://18.185.62.101:4201/api/clients/';
  _urlGetEmit = 'http://18.185.62.101:4201/';

  private socket;


  header = new HttpHeaders().set(
    'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
  );


  constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit); }



  createClient( data: any ) {
    return this.http.post<any>(this._url + 'create', data, {headers : this.header});
  }


  listClients() {
    return Observable.create((observer) => {
      this.socket.on('/listClients', data => {
        observer.next(data);
      });
    });
  }



  getAllClients() {
    return this.http.get<any>(this._url + 'getAll/', {headers : this.header});
  }



  getOneClient(id) {
    return this.http.get<any>(this._url + 'getOne/' + id, {headers : this.header});
  }


  getOneByName(name) {
    return this.http.get<any>(this._url + 'getByName/' + name, {headers : this.header});
  }


  updateClient(id, data: any) {
    return this.http.put<any>(this._url + 'update/' + id, data, {headers : this.header});
  }



  deleteClient(id) {
    return this.http.delete<any>(this._url + 'delete/' + id, {headers : this.header});
  }


  sendMail( data: any ) {
    return this.http.post<any>(this._url + 'sendMail', data, {headers : this.header});
  }


}
