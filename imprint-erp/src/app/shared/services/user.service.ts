import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { User } from "../models/user";

// -------------------------------------
@Injectable({
  providedIn: 'root'
})

// -------------------------------------
export class UserService {



//Headers
header = new HttpHeaders().set(
  'Authorization', `Bearer ${window.localStorage.getItem("loggedUserToken")}`
);



//--------- MAIN URL -----------------------------
_url: string = "http://localhost:3000/api/user/";



// ---------------------------------------
  constructor( private http: HttpClient ) { }





// Login User
loginUser( loginData: User ) {
  return this.http.post<any>(this._url + "login", loginData)
}


// Register User
registerUser( registrationData : User ) {
  return this.http.post<any>(this._url + "register", registrationData, {headers : this.header})
}




}

