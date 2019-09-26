import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { SalesCategory } from "../models/salesCategory";
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesCategoryService {
  
// _url: string = "http://localhost:3000/api/salesCategory/";
// _urlGetEmit: string = "http://127.0.0.1:3000/";
_url: string = "http://18.185.62.101:4201/api/salesCategory/";
_urlGetEmit: string = "http://18.185.62.101:4201/";
private socket;



header = new HttpHeaders().set(
  'Authorization', `Bearer ${window.localStorage.getItem("loggedUserToken")}`
); 



  constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit)  }


addSalesCategory( salesCatData : SalesCategory ) {
  return this.http.post<any>(this._url + "create", salesCatData, {headers : this.header} )
}



listSalesCategory() {

  return Observable.create((observer) =>{
    this.socket.on('/listSalesCategory', data => {
      observer.next(data);
    })
  });
}



getSaleCat(id) {
  return this.http.get<any>(this._url + "getOne/" + id, {headers : this.header} )
}



getAllSalesCategories() {
  return this.http.get<any>(this._url + "getAll/", {headers : this.header} )
}



updateSaleCategory(id, data: any) {
  return this.http.put<any>(this._url + "update/" + id, data, {headers : this.header} )
}



deleteSaleCategory(id) {
  return this.http.delete<any>(this._url + "delete/" + id, {headers : this.header} )
}



  // -----
}
