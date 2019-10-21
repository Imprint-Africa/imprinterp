import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocPadService {
 // tslint:disable: variable-name

  _url = 'http://localhost:3000/api/docPad/';
  _urlGetEmit = 'http://127.0.0.1:3000/';
  // _url = 'http://18.185.62.101:4201/api/docPad/';
  // _urlGetEmit = 'http://18.185.62.101:4201/';

  private socket;



  header = new HttpHeaders().set(
    'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
  );


    constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit);  }



    createPad( doc: any ) {
      return this.http.post<any>(this._url + 'create', doc, {headers : this.header});
    }


    listPad() {
      return Observable.create((observer) => {
        this.socket.on('/listDocPad', data => {
          observer.next(data);
        });
      });
    }


    getAllPad() {
      return this.http.get<any>(this._url + 'getAll/', {headers : this.header});
    }


    getOnePad(id) {
      return this.http.get<any>(this._url + 'getOne/' + id, {headers : this.header});
    }


    updatePad(id, data: any) {
      return this.http.put<any>(this._url + 'update/' + id, data, {headers : this.header});
    }


    deletePad(id) {
      return this.http.delete<any>(this._url + 'delete/' + id, {headers : this.header});
    }


}
