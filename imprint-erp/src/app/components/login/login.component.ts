import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {




  @ViewChild('myForm') formValues;

  public loginForm: FormGroup;
  public loading=false;
  public submitted=false;
  public returnUrl: string;
  public loginError: string;

  public email;
  public togglePassword= "password";
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

  ngOnInit() {

    this.showPasswordIcon = false;
    this.hidePasswordIcon = true;
    this.togglePassword= "password";

    this.loginForm=this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    
    // return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }


  // conveniently get the values from the form fields
  get form() {return this.loginForm.controls;}




  // On submit

  onSubmit(){
    
    this.submitted=true;
    // stop here if the form is invalid
    if(this.loginForm.invalid){
      return;
    }
    this.loading = true;


    this.userService.loginUser(this.loginForm.value).subscribe(
      data => {
      
        window.localStorage.setItem("loggedUserToken", data.token);
        window.localStorage.setItem("loggedUserName", data.name);
        this.router.navigate(['/projects']);

      },
      error => {
        // this.loginError = error.error.message;
        this.notifyService.showError(error.error.message, "Access Restricted..")
        this.loading = false;
      }
    )

 }


// Password Toogle Functions
showPassword(){
  this.showPasswordIcon = true;
  this.hidePasswordIcon = false;
  this.togglePassword= "text";
}

hidePassword(){
  this.showPasswordIcon = false;
  this.hidePasswordIcon = true;
  this.togglePassword= "password";
}


}
