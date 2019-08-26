import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private router : Router){}

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): boolean {

      if (window.localStorage.getItem("loggedUserToken") !=null)
      return true;

      this.router.navigate(["/login"]);
      return false;
  }

  
}