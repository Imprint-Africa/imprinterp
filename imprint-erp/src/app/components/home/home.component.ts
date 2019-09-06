import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faProjectDiagram, faUsers, faEdit, faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})


export class HomeComponent implements OnInit {





  // constructor
  constructor(
    private router : Router
  ) {  }

// Icons
public faProjectDiagram = faProjectDiagram;
public faUsers = faUsers;
public faEdit = faEdit;
public faShoppingCart = faShoppingCart;
public faDollarSign = faDollarSign;


// Variables
public loggedUserName: string;
public sideBarStatus: boolean;

// permisions
public toAdmin: boolean = false;
public toAdminManager: boolean = false;
public toAdminManagerUser: boolean = false;

// Active side navbar status
public dashboardNavBarActive: boolean;
public projectsNavBarActive: boolean;
public salesNavBarActive: boolean;
public editorialNavBarActive: boolean;
public usersNavBarActive: boolean;

public myInterval: any;




  // Initialise
  ngOnInit() {
    this.sideBarStatus = false;
    this.loggedUserName = window.localStorage.getItem("loggedUserName");

    if (window.localStorage.getItem("permissionStatus") === 'isAdmin'){
        this.toAdmin= true;
        this.toAdminManagerUser= true;
        this.toAdminManager= true;
    }
    else if(window.localStorage.getItem("permissionStatus") === 'isManager'){
        this.toAdminManager= true;
        this.toAdminManagerUser= true;
    }
    else if(window.localStorage.getItem("permissionStatus") === 'isUser'){
        this.toAdminManagerUser= true;
    }


    this.myInterval = setInterval(()=>{
      this.CheckActiveNavBar();
    }, 700);

  // ---
  }
// ---


CheckActiveNavBar(){

  if(window.localStorage.getItem('ActiveNav') === 'dashboard') {this.dashboardNavBarActive = true}
  if(window.localStorage.getItem('ActiveNav') === 'projects'){this.projectsNavBarActive = true }
  if(window.localStorage.getItem('ActiveNav') === 'sales'){this.salesNavBarActive = true}
  if(window.localStorage.getItem('ActiveNav') === 'editorial'){this.editorialNavBarActive = true}
  if(window.localStorage.getItem('ActiveNav') === 'users') {this.usersNavBarActive = true}
}


  // Toggle Sidebar
  toggleSideBar() {
    this.sideBarStatus = !this.sideBarStatus;
 }





 //Navigate
 navToDashboard(){
   this.router.navigate(['/dashboard']);
 }
 navToProjects(){
  this.router.navigate(['/projects']);
 }
 navToSales(){
  this.router.navigate(['/sales']);
 }
 navToUsers(){
  this.router.navigate(['/users']);
 }

 navToProjTaskTeam(){
  this.router.navigate(['/editorial']);
 }


// Log out
  logout(){
    window.localStorage.removeItem("loggedUserToken");
    window.localStorage.removeItem("loggedUserName");
    window.localStorage.removeItem("permissionStatus");
    window.localStorage.removeItem("loggedUserID");
    this.router.navigate(['/login']);
  }




  // On Destroy
ngOnDestroy(){
  clearInterval(this.myInterval);

}




// === End ===
}
