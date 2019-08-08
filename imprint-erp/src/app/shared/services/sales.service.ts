import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { RawProject } from "../models/project";
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

// ---------------------------------------------
export class SalesService {

  //--------- MAIN URL -----------------------------
  _url: string = "http://localhost:3000/api/opps/";
  _urlGetEmit: string = "http://127.0.0.1:3000/";
  private socket;


  // ---------------------------------------
    constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit)  }
  


  // Add Opportunity Projects
addRawProject( rawProjectsData : RawProject ) {
  return this.http.post<any>(this._url + "add", rawProjectsData)
}

  // List Opportinity Projects
listRawProject() {

  return Observable.create((observer) =>{
    this.socket.on('/listOppProjects', data => {
      observer.next(data);
    })
  });
}


}
