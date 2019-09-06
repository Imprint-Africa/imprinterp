import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http"; 
import { Stage } from "../models/userSalesStages";
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSalesStagesService {


  _url: string = "http://localhost:3000/api/userSalesStages/";
  _urlGetEmit: string = "http://127.0.0.1:3000/";

  private socket;


  header = new HttpHeaders().set(
    'Authorization', `Bearer ${window.localStorage.getItem("loggedUserToken")}`
  );  


  constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit) }


  
  createStage( data : Stage ) {
    return this.http.post<any>(this._url + "create", data, {headers : this.header})
  }


  listStages() {
    return Observable.create((observer) =>{
      this.socket.on('/listUserSalesStages', data => {
        observer.next(data);
      })
    });
  }



  getAllStages() {
    return this.http.get<any>(this._url + "getAll/", {headers : this.header})
  }



  getOneStage(id) {
    return this.http.get<any>(this._url + "getOne/" + id, {headers : this.header})
  }



  getUserStages(id) {
    return this.http.get<any>(this._url + "getByUser/" + id, {headers : this.header})
  }


  updateStage(id, data: any) {
    return this.http.put<any>(this._url + "update/" + id, data, {headers : this.header})
  }



  deleteStage(id) {
    return this.http.delete<any>(this._url + "delete/" + id, {headers : this.header})
  }



}
