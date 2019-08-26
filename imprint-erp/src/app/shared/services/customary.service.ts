import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { CustomService } from "../models/customary";
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomaryService {


//--------- MAIN URL -----------------------------
_url: string = "http://localhost:3000/api/services/";
_urlGetEmit: string = "http://127.0.0.1:3000/";
private socket;


// ---------------------------------------
constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit)  }

// Create Custom service
createService( newCustomService : CustomService ) {
  return this.http.post<any>(this._url + "create", newCustomService)
}


// List Custom services
listServices() {

  return Observable.create((observer) =>{
    this.socket.on('/listCustomServices', data => {
      observer.next(data);
    })
  });

}
 

// Get All Services
getAllServices() {
  return this.http.get<any>(this._url + "getAll/" )
}





}
