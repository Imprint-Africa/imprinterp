import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private teamService: TeamsService,
    private notifyService: NotificationService
  ) {}


  // Variables

  @ViewChild('myForm') formValues;  
  public registrationForm: FormGroup;
  public submitted : boolean = false;
  public registrationError;
  public togglePassword : string;
  public showPasswordIcon : boolean;
  public hidePasswordIcon : boolean;
  public isDisabled: boolean;
  public Teams: any = [];









  ngOnInit() {

    window.localStorage.setItem('ActiveNav', 'users');
    this.submitted = false;
    this.showPasswordIcon = false;
    this.hidePasswordIcon = true;
    this.togglePassword= "password";
    this.isDisabled = false;


    // Get all Teams
    this.teamService.getAllTeams().subscribe(
      data=>{
        this.Teams = data;
      },
      error=>{
        console.log('Error');
      }
    )
    

    // list Teams
    this.teamService.listTeams().subscribe(
      data=>{
        this.Teams = data;
      },
      error=>{
        console.log('Error');
      }
    )

    



    this.registrationForm=this.formBuilder.group({

      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      department: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],

    });
    
  }

   // conveniently get the values from the form fields
   get form() {return this.registrationForm.controls;}





  // Form Submit Function
  onSubmit(){



    this.submitted=true;
    // stop here if the form is invalid
    if(this.registrationForm.invalid){
      return;
    }

    this.isDisabled = true;

    this.userService.registerUser(this.registrationForm.value).subscribe(

        data => { 
            this.notifyService.showSuccess(`User ${data.name} has been added`, "Success")
            this.formValues.resetForm(); 
            this.isDisabled = false;
            
        },
        error=>{ 
            this.notifyService.showError(error.error.msg, "Failed...")
            this.isDisabled = false;
           
        }

    )

  }





// Hide and Show Password Functions
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
