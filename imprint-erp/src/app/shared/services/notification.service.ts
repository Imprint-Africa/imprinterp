import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// ---------------------------------------------
@Injectable({
  providedIn: 'root'
})

// ---------------------------------------------
export class NotificationService {

// ----------------------------------------------
  constructor( private toastr: ToastrService ) { }

//------------- Toastr Notifications-------------------

// Success
showSuccess(message, title) {
  this.toastr.success(message, title);
} 

// Info
showInfo(message, title) {
  this.toastr.info(message, title);
}

// Info
showWarning(message, title) {
  this.toastr.warning(message, title);
}

// Error
showError(message, title) {
  this.toastr.error(message, title);
}


// ----------------------------------------------  
}
// ----------------------------------------------