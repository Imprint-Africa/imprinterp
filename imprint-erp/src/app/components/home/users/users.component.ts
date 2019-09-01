import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})


export class UsersComponent implements OnInit {


  constructor(
    private router : Router,
    private userService : UserService,
    private notifyService: NotificationService
  ) { }

  public Users: Array<any>;







  ngOnInit() {

    this.userService.listUsers().subscribe(
      data=>{
        this.Users = data;
      },
      error=>{
        console.log("Error In listing Users");
      }
    )// listUsers()
  
  }// ngOnInit()



  
}// End of Class
