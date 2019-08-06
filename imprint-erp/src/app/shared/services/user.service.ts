import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { User } from "../models/user";

// -------------------------------------
@Injectable({
  providedIn: 'root'
})

// -------------------------------------
export class UserService {

// ---------------------------------------
  constructor( private http: HttpClient ) { }


//--------- MAIN URL -----------------------------
_url: string = "http://localhost:3000/api/user/";

// Register User
registerUser( registrationData : User ) {
  return this.http.post<any>(this._url + "register", registrationData)
}

// Login User
loginUser( loginData: User ) {
  return this.http.post<any>(this._url + "login", loginData)
}



}

