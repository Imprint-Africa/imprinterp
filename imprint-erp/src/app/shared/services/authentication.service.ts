import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  private loggedInStatus= JSON.parse(localStorage.getItem('loggedIn') || 'false');


  constructor(private http: HttpClient) {
    this.currentUserSubject= new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser=this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  login(username: string, password: string){
    return this.http.post<any>(`http://localhost:3000/api/user`, {username, password})
      .pipe(map(user => {
        if (user && user.token){
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  logout() {
    localStorage.removeItem('loggedIn');
    sessionStorage.removeItem('id');
    this.currentUserSubject.next(null);
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }
  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }




}
