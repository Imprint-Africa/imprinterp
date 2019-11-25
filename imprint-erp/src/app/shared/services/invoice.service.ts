import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
 // tslint:disable: variable-name

  // _url = 'http://localhost:3000/api/invoice/';
  // _urlGetEmit = 'http://127.0.0.1:3000/';
  _url = 'http://18.185.62.101:4201/api/invoice/';
  _urlGetEmit = 'http://18.185.62.101:4201/';

  private socket;



  header = new HttpHeaders().set(
    'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
  );


    constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit);  }



    createInvoice( inv: any ) {
      return this.http.post<any>(this._url + 'create', inv, {headers : this.header});
    }


    listInvoices() {
      return Observable.create((observer) => {
        this.socket.on('/listInvoices', data => {
          observer.next(data);
        });
      });
    }


    getAllInvoices() {
      return this.http.get<any>(this._url + 'getAll/', {headers : this.header});
    }


    getOneInvoice(id) {
      return this.http.get<any>(this._url + 'getOne/' + id, {headers : this.header});
    }


    updateInvoice(id, data: any) {
      return this.http.put<any>(this._url + 'update/' + id, data, {headers : this.header});
    }


    deleteInvoice(id) {
      return this.http.delete<any>(this._url + 'delete/' + id, {headers : this.header});
    }

    sendInvoice( data: any ) {
      return this.http.post<any>(this._url + 'sendInvoice', data, {headers : this.header});
    }

}
