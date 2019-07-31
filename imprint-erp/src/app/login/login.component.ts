import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/services/authentication.service";
import {AlertsService} from "../shared/services/alerts.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading=false;
  submitted=false;
  returnUrl: string;
  loginError: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertservice: AlertsService,
  ) {
      if (authService.currentUserValue) {
        this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // conveniently get the values from the form fields
  get form() {return this.loginForm.controls;}

  onSubmit(){
    this.submitted=true;
    // stop here if the form is invalid
    if(this.loginForm.invalid){
      return;
    }
    this.loading = true;
    this.authService.login(this.form.username.value, this.form.password.value)
      .pipe(first())
      .subscribe(data => {
          this.router.navigate(['/']);
          this.authService.setLoggedIn(true);
          sessionStorage.setItem('id', data.user_id);
          // console.log(data);
        },
        error => {
          this.loginError = 'Username or Password is Incorrect';
          this.alertservice.error(error);
          this.loading = false;
        });
  }

}
