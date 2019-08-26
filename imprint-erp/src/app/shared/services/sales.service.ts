import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { oppProject } from "../models/opportunity";
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
addOppProject( oppProjectsData : oppProject ) {
  return this.http.post<any>(this._url + "create", oppProjectsData)
}

  // List Opportinity Projects
listOppProject() {

  return Observable.create((observer) =>{
    this.socket.on('/listOppProjects', data => {
      observer.next(data);
    })
  });
}


// Get All Opp Project
getAllOppProject() {
  return this.http.get<any>(this._url + "getAll/")
}

// Get Specific Opp Project
getOppProject(id) {
  return this.http.get<any>(this._url + "getOne/" + id )
}



// Update Opp Project
updateOppProject(id, data: any) {
  return this.http.put<any>(this._url + "update/" + id, data )
}



// Delete Opp Project
deleteOppProject(id) {
  return this.http.delete<any>(this._url + "delete/" + id )
}


}
