import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {




  @ViewChild('myForm') formValues;

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public loginError: string;

  public email;
  public togglePassword = 'password';
  public showPasswordIcon;
  public hidePasswordIcon;



  // constructor
  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notifyService: NotificationService

  ) {}

  // tslint:disable: prefer-const
  // tslint:disable: object-literal-shorthand

  ngOnInit() {

    this.showPasswordIcon = false;
    this.hidePasswordIcon = true;
    this.togglePassword = 'password';

    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    // Comment this after set Up
    // this.createSuperUser();
  }


  // conveniently get the values from the form fields
  get form() {return this.loginForm.controls; }




  // On submit

  onSubmit() {

    this.submitted = true;
    // stop here if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;


    this.userService.loginUser(this.loginForm.value).subscribe(
      data => {

        window.localStorage.setItem('loggedUserToken', data.token);
        window.localStorage.setItem('loggedUserName', data.name);
        window.localStorage.setItem('loggedUserEmail', data.email);
        window.localStorage.setItem('loggedUserID', data._id);


        return  data.role === 'admin' ?
                    (window.localStorage.setItem('permissionStatus', 'isAdmin') , this.router.navigate(['/dashboard'])) :

                data.role === 'manager' ?
                    (window.localStorage.setItem('permissionStatus', 'isManager') , this.router.navigate(['/dashboard'])) :

                    (window.localStorage.setItem('permissionStatus', 'isUser') , this.router.navigate(['/projects']));

      },
      error => {
        this.notifyService.showError(error.error.message, 'Access Restricted..');
        this.loading = false;
      }
    );

 }


// Password Toogle Functions
showPassword() {
  this.showPasswordIcon = true;
  this.hidePasswordIcon = false;
  this.togglePassword = 'text';
}

hidePassword() {
  this.showPasswordIcon = false;
  this.hidePasswordIcon = true;
  this.togglePassword = 'password';
}



// Comment this after set Up
// createSuperUser() {
//   let superUser = {
//     name: 'Kimutai',
//     email: 'kimutai@imprintaf.com',
//     role: 'admin',
//     department: 'Dev Team',
//     password: '1234',
//   };
//   this.userService.registerUser(superUser).subscribe(
//     data => {
//       this.notifyService.showSuccess('SuperUserCreated', 'Success');
//     },
//     error => {
//       this.notifyService.showError('Did not create Super User', 'Failed');
//     }
//   );
// }



}// End of Class
