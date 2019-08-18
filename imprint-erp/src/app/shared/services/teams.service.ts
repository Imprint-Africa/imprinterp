import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { Team } from "../models/teams";
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {



//--------- MAIN URL -----------------------------
_url: string = "http://localhost:3000/api/teams/";
_urlGetEmit: string = "http://127.0.0.1:3000/";
private socket;


  // ---------------------------------------
  constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit)  }


// Create Team
createTeam( newTeam : Team ) {
  return this.http.post<any>(this._url + "create", newTeam)
}

// List Teams
listTeams() {

  return Observable.create((observer) =>{
    this.socket.on('/listTeams', data => {
      observer.next(data);
    })
  });

}
  


}
