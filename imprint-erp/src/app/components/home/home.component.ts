import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  // constructor
  constructor(
    private router : Router
  ) { }

  public loggedUserName: string;
  public sideBarStatus: boolean;

  // Initialise
  ngOnInit() {
    this.sideBarStatus = false;
    this.loggedUserName = window.localStorage.getItem("loggedUserName");

  }

  // Toggle Sidebar
  toggleSideBar() {
    this.sideBarStatus = !this.sideBarStatus;
 }

 //Navigate
 navToProjects(){
  this.router.navigate(['/projects']);
 }
 navToSales(){
  this.router.navigate(['/sales']);
 }
 navToRegister(){
  this.router.navigate(['/register']);
 }

 navToProjTaskTeam(){
  this.router.navigate(['/proj_task_team']);
 }


// Log out
  logout(){
    window.localStorage.removeItem("loggedUserToken");
    window.localStorage.removeItem("loggedUserName");
    this.router.navigate(['/login']);
  }


}
