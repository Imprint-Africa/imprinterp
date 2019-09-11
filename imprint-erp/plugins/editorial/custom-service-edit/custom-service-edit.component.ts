import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { CustomaryService } from 'src/app/shared/services/customary.service';
import { SalesCategoryService } from 'src/app/shared/services/sales-category.service';


@Component({
  selector: 'app-custom-service-edit',
  templateUrl: './custom-service-edit.component.html',
  styleUrls: ['./custom-service-edit.component.sass']
})


export class CustomServiceEditComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private notifyService: NotificationService,
    private teamsService: TeamsService,
    private customService: CustomaryService,
  ) { }

// Modal
@ViewChild('dangerModal') public dangerModal: ModalDirective;

// permisions
public toAdmin: boolean = false;
public toAdminManager: boolean = false;
public toAdminManagerUser: boolean = false;

public serviceNameForm: FormGroup;
public targetRevenueForm: FormGroup;
public taskForm: FormGroup;


public serviceTobeEdited;
public Teams : any = [];

public taskNameInputValue: string;
public assignedTeamInputValue: string;



  ngOnInit() {

    if(!window.localStorage.getItem('IdServiceTobeEdited')){
      this.router.navigate(['/editorial']);
    }
    else if(window.localStorage.getItem('IdServiceTobeEdited')){
      window.localStorage.setItem('ActiveNav', 'editorial');

      if (window.localStorage.getItem("permissionStatus") === 'isAdmin'){
        this.toAdmin= true;
      }


            // List Teams
      this.teamsService.listTeams().subscribe(
        data=>{
            this.Teams = data;
        },
        error=>{
          console.log(error)
        }
      )


      this.customService.getOneService(window.localStorage.getItem('IdServiceTobeEdited')).subscribe(
        data=>{
            this.serviceTobeEdited = data;
            this.notifyService.showInfo(`${data.serviceName} service is openned.`, 'Info');
        },
        error=>{
          console.log('Error')
          this.notifyService.showError(`Request Error`, 'Error');
        }
      ) 




      this.serviceNameForm=this.formBuilder.group({
        serviceName: ['', Validators.required],
      });

      this.targetRevenueForm=this.formBuilder.group({
        targetRevenue: ['', Validators.required],
      });

      this.taskForm=this.formBuilder.group({
        taskName: ['', Validators.required],
        assignedTeam: ['', Validators.required]
      });



    }
// ---
  }
 
  


get formChangeServiceName() {return this.serviceNameForm.controls;}
get formChangeTargetRevenue() {return this.targetRevenueForm.controls;}
get formChangeTasks() {return this.taskForm.controls;}






submitServiceNameChange(){
  
  this.customService.updateServices(window.localStorage.getItem('IdServiceTobeEdited'), {serviceName: this.serviceNameForm.value.serviceName.toLowerCase()}).subscribe(
    data=>{
      this.serviceTobeEdited = data;
      this.notifyService.showSuccess('Servcce Name Changed', 'Success');
    },
    error=>{
      this.notifyService.showError('Service Not Changed', 'Error');
    }
  )

}






submitTargetRevenueChange(){

  this.customService.updateServices(window.localStorage.getItem('IdServiceTobeEdited'), {targetRevenue: this.targetRevenueForm.value.targetRevenue}).subscribe(
    data=>{
      this.serviceTobeEdited = data;
      this.notifyService.showSuccess('Revenue Chenged', 'Success');
    },
    error=>{
      this.notifyService.showError('Revenue Not Changed', 'Error');
    }
  )

}




submitTaskNameChange(id){
  let taskToBeUpdated = [];

  this.serviceTobeEdited.task.forEach((task)=>{
    if(task._id === id){ 
      task.taskName = this.taskForm.value.taskName.toLowerCase();
    }
    let structuredDate = {
      taskName: task.taskName,
      assignedTeam: task.assignedTeam,
    }
    taskToBeUpdated.push(structuredDate);
  });

  this.customService.updateServices(window.localStorage.getItem('IdServiceTobeEdited'), {task: taskToBeUpdated}).subscribe(
    data=>{
      this.serviceTobeEdited = data;
      this.notifyService.showSuccess('Task Updated', 'Success');
    },
    error=>{
      this.notifyService.showError('Task Not Changed', 'Error');
    }
  )

}






submitAssignedTeamChange(id){

  let taskToBeUpdated = [];

  this.serviceTobeEdited.task.forEach((task)=>{
    if(task._id === id){ 
      task.assignedTeam = this.taskForm.value.assignedTeam;
    }
    let structuredDate = {
      taskName: task.taskName,
      assignedTeam: task.assignedTeam,
    }
    taskToBeUpdated.push(structuredDate);
  });

  this.customService.updateServices(window.localStorage.getItem('IdServiceTobeEdited'), {task: taskToBeUpdated}).subscribe(
    data=>{
      this.serviceTobeEdited = data;
      this.notifyService.showSuccess('Task Updated', 'Success');
    },
    error=>{
      this.notifyService.showError('Task Not Changed', 'Error');
    }
  )

}







deleteService(){

  this.customService.deleteService(window.localStorage.getItem('IdServiceTobeEdited')).subscribe(
    data=>{
      this.notifyService.showSuccess('Service Deleted', 'Success');
      window.localStorage.removeItem('IdServiceTobeEdited');
      setTimeout(()=>{
        this.router.navigate(['/editorial'])
      }, 3000);
    },
    error=>{
      this.notifyService.showError('Not Deleted', "Error");
    }
  )
   
 }



// END
}
