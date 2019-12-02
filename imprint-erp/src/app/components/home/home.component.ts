import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faProjectDiagram, faUsers, faEdit, faShoppingCart, faDollarSign, faChartLine, faBook, faFileInvoice,
  faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})


export class HomeComponent implements OnInit, OnDestroy {

  // constructor
  constructor(
    private router: Router
  ) {  }

// tslint:disable: prefer-const
// tslint:disable: object-literal-shorthand

// Icons
public faProjectDiagram = faProjectDiagram;
public faUsers = faUsers;
public faEdit = faEdit;
public faShoppingCart = faShoppingCart;
public faDollarSign = faDollarSign;
public faChartLine = faChartLine;
public faBook = faBook;
public faCalendar = faCalendar;
public faFileInvoice = faFileInvoice;

// Variables
public loggedUserName: string;
public sideBarStatus: boolean;

// permisions
public toAdmin = false;
public toAdminManager = false;
public toAdminManagerUser = false;

// Active side navbar status
public dashboardNavBarActive: boolean;
public projectsNavBarActive: boolean;
public salesNavBarActive: boolean;
public editorialNavBarActive: boolean;
public usersNavBarActive: boolean;
public documentNavBarActive: boolean;
public calendarNavBarActive: boolean;
public invoiceNavBarActive: boolean;

public myInterval: any;




  // Initialise
  ngOnInit() {
    this.sideBarStatus = false;
    this.loggedUserName = window.localStorage.getItem('loggedUserName');

    if (window.localStorage.getItem('permissionStatus') === 'isAdmin') {
        this.toAdmin = true;
        this.toAdminManagerUser = true;
        this.toAdminManager = true;
    } else if (window.localStorage.getItem('permissionStatus') === 'isManager') {
        this.toAdminManager = true;
        this.toAdminManagerUser = true;
    } else if (window.localStorage.getItem('permissionStatus') === 'isUser') {
        this.toAdminManagerUser = true;
    }


    this.myInterval = setInterval(() => {
      this.CheckActiveNavBar();
    }, 700);

  // ---
  }
// ---


CheckActiveNavBar() {

  if (window.localStorage.getItem('ActiveNav') === 'dashboard') {this.dashboardNavBarActive = true; }
  if (window.localStorage.getItem('ActiveNav') === 'projects') {this.projectsNavBarActive = true; }
  if (window.localStorage.getItem('ActiveNav') === 'sales') {this.salesNavBarActive = true; }
  if (window.localStorage.getItem('ActiveNav') === 'editorial') {this.editorialNavBarActive = true; }
  if (window.localStorage.getItem('ActiveNav') === 'users') {this.usersNavBarActive = true; }
  if (window.localStorage.getItem('ActiveNav') === 'document') {this.documentNavBarActive = true; }
  if (window.localStorage.getItem('ActiveNav') === 'ngcalender') {this.calendarNavBarActive = true; }
  if (window.localStorage.getItem('ActiveNav') === 'invoice') {this.invoiceNavBarActive = true; }
}


  // Toggle Sidebar
  toggleSideBar() {
    this.sideBarStatus = !this.sideBarStatus;
 }





 // Navigate
 navToDashboard() {
   this.router.navigate(['/dashboard']);
 }
 navToProjects() {
  this.router.navigate(['/projects']);
 }
 navToSales() {
  this.router.navigate(['/sales']);
 }
 navToUsers() {
  this.router.navigate(['/users']);
 }
 navToProjTaskTeam() {
  this.router.navigate(['/editorial']);
 }
 navToDocument() {
  this.router.navigate(['/document']);
 }
 navToInvoice() {
  this.router.navigate(['/invoice']);
 }
 navToCalendar() {
  this.router.navigate(['/ngCalendar']);
 }

// Log out
  logout() {
    window.localStorage.removeItem('loggedUserToken');
    window.localStorage.removeItem('loggedUserName');
    window.localStorage.removeItem('permissionStatus');
    window.localStorage.removeItem('loggedUserID');
    this.router.navigate(['/login']);
  }




    // On Destroy
  ngOnDestroy() {
    clearInterval(this.myInterval);

  }




// === End ===
}
