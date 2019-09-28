import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SalesService } from 'src/app/shared/services/sales.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.sass'],
})
export class SalesEditComponent implements OnInit {


  // Constructor
  constructor(
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private router : Router,
    private userService: UserService,
    private salesService: SalesService,
    private projectService: ProjectsService,
    private notifyService: NotificationService
  ) { 
  }


// Variables
public projectManagerForm: FormGroup;
public assignedUserForm: FormGroup;
@ViewChild('myCostPriorForm') myCostPriorFormValues;
public costPriorForm: FormGroup;



// Status
public listClickedStatus;
public taskDetailsStatus;
public taskClickedTeamStatus;
public projectCalenderStatus;


// Binded Variables

public OpennedProject: any;
public OpennedProjectTasks: any = [];
public TaskNumber: number;
public projPriority: string;
public totalTasks: number;
public totalSelectedTasks: number;
public totalTeams: number;
public totalSelectedTeams: number;
public Users: any = [];
public totalProjectAssignedUsers: number;


// Calender Variable
public projectDuration: number;
public projectHoveredDate: NgbDate;
public projectFromDate: NgbDate;
public projectToDate: NgbDate;
public projectMinDate = this.calendar.getToday();


public taskDuration: number;
public taskHoveredDate: NgbDate;
public taskFromDate: NgbDate;
public taskToDate: NgbDate;
public taskMinDate;
public taskMaxDate;










// Initialize
  ngOnInit() {
    window.localStorage.setItem('ActiveNav', 'sales');
    this.listClickedStatus = null;
    this.taskDetailsStatus = false;

    /// set dates
    this.taskFromDate = this.calendar.getToday();
    this.taskToDate = null;


    if(window.localStorage.getItem('salesEditItemId')){

    // Get The project For Editing
        this.salesService.getOppProject(window.localStorage.getItem('salesEditItemId')).subscribe(

          data=>{


            this.setdata(data);

                

            // set Dates
            if(data.projectDuration === null){
              this.projectFromDate = this.calendar.getToday();
              this.taskMinDate = this.projectFromDate;
              this.taskMaxDate = this.calendar.getNext(this.taskMinDate, 'd', 7);
              this.projectToDate = null;           
            }else{
              this.convertDatesToNgbDates(data);

            }
                    

            let clientName = data.clientName.toUpperCase()
            let projectName = data.projectName.toUpperCase()
            this.notifyService.showInfo(`${clientName} ${projectName} project is opened`, "Info...")

          },

          error=>{
            console.log(error);
          }

        )
        
        }else{
          this.router.navigate(['/sales']);
        }


      // Pass form values
      this.costPriorForm=this.formBuilder.group({
        cost: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        priority: null
      });

      this.projectManagerForm=this.formBuilder.group({
        projectManager: ['', Validators.required],
      });

      this.assignedUserForm=this.formBuilder.group({
        assignedUser: ['', Validators.required],
      });
    

      this.userService.listUsers().subscribe(
        data=>{
            this.Users = data;
        },
        error=>{
            console.log('Error in getting Users');
        }
      )
    



//  -----   
  }
// -----



 // conveniently get the values from the form fields
 get formProjectManager() {return this.projectManagerForm.controls;}
 get formAssignedUser() {return this.assignedUserForm.controls;}
 get formCostPrior() {return this.costPriorForm.controls;}



setdata(data){

  this.OpennedProject = data;
  this.projPriority = data.priority;

  this.totalTasks = data.task.length;
  this.totalSelectedTasks = data.task.filter((task)=>{
    return task.taskStatus === 'checked' ? true : false
  }).map(task=>{return task}).length;


  let getInvolvedTeam =  data.task.filter(task=>{ return true}).map(task=>{return task.assignedTeam});
  this.totalTeams = Array.from(new Set(getInvolvedTeam)).length;

  let getSelectedInvolvedTeam =  data.task.filter((task)=>{
    return task.taskStatus === 'checked' ? true : false
  }).map(task=>{return task.assignedTeam});

  this.totalSelectedTeams = Array.from(new Set(getSelectedInvolvedTeam)).length;

  let getInvolvedUsers =  data.task.filter(task=>{ return task.assignedUser === ''? false: true}).map(task=>{return task.assignedUser});
  this.totalProjectAssignedUsers = Array.from(new Set(getInvolvedUsers)).length;

}


convertDatesToNgbDates(data){
    this.OpennedProject = data;
    // converting project date to NgbDate
    let startdates = new Date(data.projectStartDate);
    this.projectFromDate = new NgbDate(startdates.getUTCFullYear(), startdates.getUTCMonth() + 1, startdates.getUTCDate());
    this.projectToDate = this.calendar.getNext(this.projectFromDate, 'd', data.projectDuration);
    this.OpennedProject.projectStartDate = this.projectFromDate;
    this.OpennedProject.projectEndDate = this.projectToDate;
    this.taskMinDate = this.projectFromDate;
    this.taskMaxDate = this.projectToDate;

    // converting task date to NgbDate
    this.OpennedProject.task.forEach((task)=>{
      if (task.taskDuration){
      let taskStartDates = new Date(task.taskStartDate);
      task.taskStartDate = new NgbDate(taskStartDates.getUTCFullYear(), taskStartDates.getUTCMonth() + 1, taskStartDates.getUTCDate());
      task.taskEndDate = this.calendar.getNext(task.taskStartDate, 'd', task.taskDuration);
      }
    })

}




// Toogle calender
taskDetailsToggle(id){
  this.listClickedStatus = id;
  this.taskDetailsStatus = !this.taskDetailsStatus;

  this.OpennedProject.task.forEach(task=>{
    return this.listClickedStatus === task._id ? this.taskClickedTeamStatus = task.assignedTeam : ''
  })
}









// Projects Dates Seclection functions
onProjectDateSelection(date: NgbDate) {

  this.projectFromDate = date;
  this.projectToDate = this.calendar.getNext(this.projectFromDate, 'd', this.projectDuration);

}

isProjectDateHovered(date: NgbDate) {
return this.projectFromDate && !this.projectToDate && this.projectHoveredDate && date.after(this.projectFromDate) && date.before(this.projectHoveredDate);
}

isProjectDateInside(date: NgbDate) {
return date.after(this.projectFromDate) && date.before(this.projectToDate);
}

isProjectDateRange(date: NgbDate) {
return date.equals(this.projectFromDate) || date.equals(this.projectToDate) || this.isProjectDateInside(date) || this.isProjectDateHovered(date);
}

isProjectDateBeforeMinDate(date: NgbDate) {
  return date.before(this.projectMinDate);
}






// Save Project dates and Duration
saveProjectDurationDates(){

  let dataToBeSent = {
    projectDuration: this.projectDuration,
    projectStartDate: new Date(this.projectFromDate.year, this.projectFromDate.month -1, this.projectFromDate.day + 1),
    projectEndDate: new Date(this.projectToDate.year, this.projectToDate.month -1, this.projectToDate.day + 1)
  }

  this.salesService.updateOppProject(window.localStorage.getItem('salesEditItemId'), dataToBeSent).subscribe(
    data=>{
      this.setdata(data);
      this.convertDatesToNgbDates(data);

      this.notifyService.showSuccess('Dates Changes Saved', 'Success');
    },
    error=>{
      this.notifyService.showError('No Changes are Saved', 'Error');

    }
  )
}







submitProjectManager(){

  this.salesService.updateOppProject(window.localStorage.getItem('salesEditItemId'), this.projectManagerForm.value).subscribe(
    data=>{
      
      this.setdata(data);
      this.convertDatesToNgbDates(data);

      this.notifyService.showSuccess("Changes Saved", "Success")
    },
    error=>{
      this.notifyService.showError("Changes Not saved", "Error !")
    }
  )

}








// Tasks Dates Seclection functions

onTaskDateSelection(date: NgbDate) {

    this.taskFromDate = date;
    this.taskToDate = this.calendar.getNext(this.taskFromDate, 'd', this.taskDuration);

}

isTaskDateHovered(date: NgbDate) {
  return this.taskFromDate && !this.taskToDate && this.taskHoveredDate && date.after(this.taskFromDate) && date.before(this.taskHoveredDate);
}

isTaskDateInside(date: NgbDate) {
  return date.after(this.taskFromDate) && date.before(this.taskToDate);
}

isTaskDateRange(date: NgbDate) {
  return date.equals(this.taskFromDate) || date.equals(this.taskToDate) || this.isTaskDateInside(date) || this.isTaskDateHovered(date);
}

isTaskDateOutSide(date: NgbDate) {
  return date.before(this.taskMinDate) || date.after(this.taskMaxDate);
}






// Save Changes on Tasks
saveTasksDurationDates(){
  this.OpennedProject.task.forEach((t)=>{
  
    if (this.listClickedStatus === t._id){
          t.taskDuration = this.taskDuration,
          t.taskStartDate = new Date(this.taskFromDate.year, this.taskFromDate.month -1, this.taskFromDate.day +1);
          t.taskEndDate = new Date(this.taskToDate.year, this.taskToDate.month -1, this.taskToDate.day +1);
          t.taskStatus = 'checked';
          
    }
    if (t._id != this.listClickedStatus && t.taskDuration){
      t.taskStartDate = new Date(t.taskStartDate.year, t.taskStartDate.month -1, t.taskStartDate.day +1);
      t.taskEndDate = new Date(t.taskEndDate.year, t.taskEndDate.month -1, t.taskEndDate.day + 1);
    }

  })


  this.salesService.updateOppProject(window.localStorage.getItem('salesEditItemId'), {task : this.OpennedProject.task}).subscribe(
    data=>{

      this.setdata(data);
      this.convertDatesToNgbDates(data);

      this.notifyService.showSuccess('Task Updated', 'Success');
      this.taskDetailsStatus = !this.taskDetailsStatus;
    },
    error=>{
      this.notifyService.showError('Task Not Updated', 'Error');

    }
  )

}





changeAssignedUser(){

  this.OpennedProject.task.forEach((t)=>{

    if (this.listClickedStatus === t._id){
          t.assignedUser = this.assignedUserForm.value.assignedUser

          if(t.taskDuration){
            t.taskStartDate = new Date(t.taskStartDate.year, t.taskStartDate.month -1, t.taskStartDate.day +1);
            t.taskEndDate = new Date(t.taskEndDate.year, t.taskEndDate.month -1, t.taskEndDate.day + 1);
          }
    }
    if (t._id != this.listClickedStatus && t.taskDuration){
      t.taskStartDate = new Date(t.taskStartDate.year, t.taskStartDate.month -1, t.taskStartDate.day +1);
      t.taskEndDate = new Date(t.taskEndDate.year, t.taskEndDate.month -1, t.taskEndDate.day + 1);
    }
  
  });
  
  this.salesService.updateOppProject(window.localStorage.getItem('salesEditItemId'), {task : this.OpennedProject.task}).subscribe(
    data=>{

      this.convertDatesToNgbDates(data);

      let getInvolvedUsers =  data.task.filter(task=>{ return task.assignedUser === ''? false: true}).map(task=>{return task.assignedUser});
      this.totalProjectAssignedUsers = Array.from(new Set(getInvolvedUsers)).length;


      this.taskDetailsStatus = !this.taskDetailsStatus;
      this.notifyService.showSuccess('Task Updated', 'Success');
    },error=>{
      this.notifyService.showError('Task Not Updated', 'Success');
    }
  )


}









// Set priority
selectPriority(num){
  this.projPriority = num;
}





// Save Changes 

saveRevenuePrioroty(){


  this.costPriorForm.value.priority = this.projPriority;

  this.salesService.updateOppProject(window.localStorage.getItem('salesEditItemId'), this.costPriorForm.value).subscribe(
    data=>{
      this.notifyService.showSuccess("Changes Saved", "Success")
    },
    error=>{
      this.notifyService.showError("Changes Not saved", "Error !")
    }
  )
 

}


discardChanges(){
  this.router.navigate(['/sales'])
}





// Loanchproject
lauchProject(){

  this.salesService.getOppProject(window.localStorage.getItem('salesEditItemId')).subscribe(
    data=>{

      let newProject = {
        clientName : data.clientName,
        projectName: data.projectName,
        projectManager: data.projectManager,
        task : data.task.filter((task)=>{
                          return task.taskStatus === 'checked';
                      }).map(task =>{return task}),
        cost: data.cost,
        priority: data.priority,
        projectStatus : 'active',   
        progress: 0,
        projectDuration: data.projectDuration,
        projectStartDate: data.projectStartDate,
        projectEndDate: data.projectEndDate,
      }        
      

      // create Projects
      this.projectService.addProject(newProject).subscribe(
        data=>{

          // delete from Opp
            this.salesService.deleteOppProject(window.localStorage.getItem('salesEditItemId')).subscribe(
              data=>{
                this.notifyService.showSuccess("Projects Launched", "Success");

                setTimeout(()=>{
                  this.router.navigate(['/projects'])
                },5000)
              },
              error=>{
                this.notifyService.showError("Launching Failed", "Error");
              }

            )
        },
        error=>{

        }
      )

    },
    error=>{
      console.log(error);
    }
  )


 
}









deleteProject(){

  this.salesService.deleteOppProject(window.localStorage.getItem('salesEditItemId')).subscribe(

    data =>{
      this.notifyService.showSuccess("Projects Deleted", "Success");
      setTimeout(()=>{
                this.router.navigate(['/sales'])
          },2000)
    },
    error =>{
      this.notifyService.showError("Projects Not Deleted", "Failled");
    }

  )

}






 
ngOnDestroy(){
  window.localStorage.removeItem('salesEditItemId');
}



// === end ===
}
