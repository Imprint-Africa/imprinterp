import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})


export class UsersComponent implements OnInit {


  constructor(
    private router : Router,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private notifyService: NotificationService,
    private spinnerServcice: SpinnerService
  ) { }


  @ViewChild('editNameModal') public editNameModal: ModalDirective;
  @ViewChild('editRoleModal') public editRoleModal: ModalDirective;
  @ViewChild('editPasswordModal') public editPasswordModal: ModalDirective;
  @ViewChild('deleteUserModal') public deleteUserModal: ModalDirective;


  public editNameForm: FormGroup;
  public editRoleForm: FormGroup;
  public editPasswordForm: FormGroup;
  public inviteForm: FormGroup;

  public Users: Array<any>;
  public UserToBeEdited;
  public togglePassword: String;
  public showPasswordIcon: boolean;
  public hidePasswordIcon: boolean;







  ngOnInit() {


    window.localStorage.setItem('ActiveNav', 'users');

    this.userService.getAllUsers().subscribe(
      data=>{
        this.Users = data;
      },
      error=>{
        console.log("Error In getting all Users");
      }
    )// get all users


    this.userService.listUsers().subscribe(
      data=>{
        this.Users = data;
      },
      error=>{
        console.log("Error In listing Users");
      }
    )// listUsers()

    this.togglePassword = "password";
    this.hidePasswordIcon = false;
    this.showPasswordIcon = true;

    this.editNameForm=this.formBuilder.group({
      name: ['', Validators.required]
    })

    this.editRoleForm=this.formBuilder.group({
      role: ['', Validators.required]
    })

    this.editPasswordForm=this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]]
    })

    this.inviteForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  
  }// ngOnInit()



  get formEditName(){ return this.editNameForm.controls;}
  get formEditRole(){ return this.editRoleForm.controls;}
  get formEditPassword(){ return this.editPasswordForm.controls;}
  get formInvite(){ return this.inviteForm.controls;}




  editName(user){
    this.UserToBeEdited = user;
  }

  editRole(user){
    this.UserToBeEdited = user;
  }

  editPassword(user){
    this.UserToBeEdited = user;
  }

  deleteUser(user){
    this.UserToBeEdited = user;
  }

  showPassword(){
    this.togglePassword = 'text';
    this.hidePasswordIcon = true;
    this.showPasswordIcon = false;
  }

  hidePassword(){
    this.togglePassword = 'password';
    this.showPasswordIcon = true;
    this.hidePasswordIcon = false;
  }



  submitEditedName(){
    this.userService.updateUsers(this.UserToBeEdited._id, this.editNameForm.value).subscribe(
      data=>{
        this.notifyService.showSuccess('Name Changed', 'Success');
      },
      error=>{
        this.notifyService.showError('No Changes', 'Error');
      }
    )
  }


  submitEditedRole(){
    this.userService.updateUsers(this.UserToBeEdited._id, this.editRoleForm.value).subscribe(
      data=>{
        this.notifyService.showSuccess('Role Changed', 'Success');
      },
      error=>{
        this.notifyService.showError('No Changes', 'Error');
      }
    )
  }


  submitEditedPassword(){
    this.userService.updateUsers(this.UserToBeEdited._id, this.editPasswordForm.value).subscribe(
      data=>{
        this.notifyService.showSuccess('Password Changed', 'Success');
      },
      error=>{
        this.notifyService.showError('No Changes', 'Error');
      }
    )
  }


  submitDeletedUser(){
    this.userService.deleteUser(this.UserToBeEdited._id).subscribe(
      data=>{
        this.notifyService.showSuccess('User Deleted', 'Success');
      },
      error=>{
        this.notifyService.showError('No Changes', 'Error');
      }
    )
  }


  inviteUser(){
    this.spinnerServcice.spinStart();
    let dataToBeSent = {
      sender: localStorage.getItem("loggedUserEmail"),
      reciever: this.inviteForm.value.email,
      token: localStorage.getItem("loggedUserToken")
    }
    // console.log(dataToBeSent)
    this.userService.inviteUser(dataToBeSent).subscribe(
      data=>{
        this.notifyService.showSuccess('Invitation Sent', 'Success');
        this.spinnerServcice.spinStop();
      },
      error=>{
        this.notifyService.showError('Not Sent', 'Error');
        this.spinnerServcice.spinStop();
      }
    )
  }

  
}// End of Class
