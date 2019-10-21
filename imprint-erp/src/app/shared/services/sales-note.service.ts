import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesNoteService {
 // tslint:disable: variable-name

  // _url = 'http://localhost:3000/api/salesNotes/';
  // _urlGetEmit = 'http://127.0.0.1:3000/';
  _url = 'http://18.185.62.101:4201/api/salesNotes/';
  _urlGetEmit = 'http://18.185.62.101:4201/';

  private socket;



  header = new HttpHeaders().set(
    'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
  );


    constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit);  }



    createNote( notes: any ) {
      return this.http.post<any>(this._url + 'create', notes, {headers : this.header});
    }


    listNotes() {
      return Observable.create((observer) => {
        this.socket.on('/listSalesNotes', data => {
          observer.next(data);
        });
      });
    }


    getAllNotes() {
      return this.http.get<any>(this._url + 'getAll/', {headers : this.header});
    }


    getOneNote(id) {
      return this.http.get<any>(this._url + 'getOne/' + id, {headers : this.header});
    }


    updateNote(id, data: any) {
      return this.http.put<any>(this._url + 'update/' + id, data, {headers : this.header});
    }


    deleteNote(id) {
      return this.http.delete<any>(this._url + 'delete/' + id, {headers : this.header});
    }


}
