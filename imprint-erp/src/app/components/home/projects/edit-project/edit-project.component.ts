import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.sass']
})


export class EditProjectComponent implements OnInit {



    constructor(
      private calendar: NgbCalendar,
      private formBuilder: FormBuilder,
      private router : Router,
      private userService: UserService,
      private teamsService: TeamsService,
      private projectService: ProjectsService,
      private notifyService: NotificationService
    ) { 
    }



// Variables
public projectManagerForm: FormGroup;
public assignedUserForm: FormGroup;

@ViewChild('taskDefineInput') taskDefineInputField: ElementRef;
public addTaskForm: FormGroup;

@ViewChild('myCostPriorForm') myCostPriorFormValues;
public costPriorForm: FormGroup;



// Status
public listClickedStatus;
public taskDetailsStatus;
public taskClickedTeamStatus;


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
public Teams : any = [];
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






  ngOnInit() {

    // ckeck if project exists
    if(window.localStorage.getItem('projectOnEditId')){

      window.localStorage.setItem('ActiveNav', 'projects');

          // Get The project For Editing
          this.projectService.getProject(window.localStorage.getItem('projectOnEditId')).subscribe(

            data=>{
  
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
                  
  
              // set Dates
              if(data.projectDuration === null){
                this.projectFromDate = this.calendar.getToday();
                this.taskMinDate = this.projectFromDate;
                this.taskMaxDate = this.calendar.getNext(this.taskMinDate, 'd', 7);
                this.projectToDate = null;           
              }else{
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
                      
  
              let clientName = data.clientName.toUpperCase()
              let projectName = data.projectName.toUpperCase()
              this.notifyService.showInfo(`${clientName} ${projectName} project is opened`, "Info...")
  
            },
  
            error=>{
              console.log(error);
            }
  
          )

        }
        else{
          this.router.navigate(['/projects']);
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

          this.addTaskForm=this.formBuilder.group({
              taskName: ['', Validators.required],
              assignedTeam: ['', Validators.required],
              assignedUser: ['', Validators.required],
              taskStatus: ['checked'],
              taskDuration: [null],
              taskStartDate: [null],
              taskEndDate: [null],
            });
    
          // List Teams
          this.teamsService.listTeams().subscribe(
            data=>{
                this.Teams = data;
            },
            error=>{
              console.log(error)
            }
          )

          // List Users
          this.userService.listUsers().subscribe(
            data=>{
                this.Users = data;
            },
            error=>{
                console.log('Error in getting Users');
            }
          )

    //
  }
//


 // conveniently get the values from the form fields
 get formProjectManager() {return this.projectManagerForm.controls;}
 get formAssignedUser() {return this.assignedUserForm.controls;}
 get formAddTask(){ return this.addTaskForm.controls;}
 get formCostPrior() {return this.costPriorForm.controls;}



 toDetails(){
   this.router.navigate(['/project_details']);
 }

 toTeams(){
  this.router.navigate(['/project_update']);
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

  this.projectService.updateProject(window.localStorage.getItem('projectOnEditId'), dataToBeSent).subscribe(
    data=>{
      this.OpennedProject = data;
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



      this.notifyService.showSuccess('Dates Changes Saved', 'Success');
    },
    error=>{
      this.notifyService.showError('No Changes are Saved', 'Error');

    }
  )
}







submitProjectManager(){

  this.projectService.updateProject(window.localStorage.getItem('projectOnEditId'), this.projectManagerForm.value).subscribe(
    data=>{
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
changeTasksDurationDates(){
this.OpennedProject.task.forEach((t)=>{

  if (this.listClickedStatus === t._id){
        t.taskDuration = this.taskDuration;
        t.taskStartDate = new Date(this.taskFromDate.year, this.taskFromDate.month -1, this.taskFromDate.day +1);
        t.taskEndDate = new Date(this.taskToDate.year, this.taskToDate.month -1, this.taskToDate.day +1);
        
  }
  if (t._id != this.listClickedStatus && t.taskDuration){
    t.taskStartDate = new Date(t.taskStartDate.year, t.taskStartDate.month -1, t.taskStartDate.day +1);
    t.taskEndDate = new Date(t.taskEndDate.year, t.taskEndDate.month -1, t.taskEndDate.day + 1);
  }

})


this.projectService.updateProject(window.localStorage.getItem('projectOnEditId'), {task : this.OpennedProject.task}).subscribe(
  data=>{

    this.OpennedProject.task = data.task;

    let getInvolvedUsers =  data.task.filter(task=>{ return task.assignedUser === ''? false: true}).map(task=>{return task.assignedUser});
    this.totalProjectAssignedUsers = Array.from(new Set(getInvolvedUsers)).length;


    // converting task date to NgbDate
    this.OpennedProject.task.forEach((task)=>{
      if (task.taskDuration){
      let taskStartDates = new Date(task.taskStartDate);
      task.taskStartDate = new NgbDate(taskStartDates.getUTCFullYear(), taskStartDates.getUTCMonth() + 1, taskStartDates.getUTCDate());
      task.taskEndDate = this.calendar.getNext(task.taskStartDate, 'd', task.taskDuration);
      }
    })

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
          t.taskStartDate = new Date(t.taskStartDate.year, t.taskStartDate.month -1, t.taskStartDate.day +1);
          t.taskEndDate = new Date(t.taskEndDate.year, t.taskEndDate.month -1, t.taskEndDate.day + 1);
          
    }
    if (t._id != this.listClickedStatus && t.taskDuration){
      t.taskStartDate = new Date(t.taskStartDate.year, t.taskStartDate.month -1, t.taskStartDate.day +1);
      t.taskEndDate = new Date(t.taskEndDate.year, t.taskEndDate.month -1, t.taskEndDate.day + 1);
    }
  
  });
  
  this.projectService.updateProject(window.localStorage.getItem('projectOnEditId'), {task : this.OpennedProject.task}).subscribe(
    data=>{

      this.OpennedProject.task = data.task;

      let getInvolvedUsers =  data.task.filter(task=>{ return task.assignedUser === ''? false: true}).map(task=>{return task.assignedUser});
      this.totalProjectAssignedUsers = Array.from(new Set(getInvolvedUsers)).length;

  
      // converting task date to NgbDate
      this.OpennedProject.task.forEach((task)=>{
        if (task.taskDuration){
        let taskStartDates = new Date(task.taskStartDate);
        task.taskStartDate = new NgbDate(taskStartDates.getUTCFullYear(), taskStartDates.getUTCMonth() + 1, taskStartDates.getUTCDate());
        task.taskEndDate = this.calendar.getNext(task.taskStartDate, 'd', task.taskDuration);
        }
      })

      this.notifyService.showSuccess('Task Updated', 'Success');
    },error=>{
      this.notifyService.showError('Task Not Updated', 'Success');
    }
  )


}









addTask(){
  this.addTaskForm.value.taskDuration = this.taskDuration;
  this.addTaskForm.value.taskStartDate = this.taskFromDate;
  this.addTaskForm.value.taskEndDate = this.taskToDate;

  this.OpennedProject.task.push(this.addTaskForm.value);

  let dataToBeUpdated = this.OpennedProject.task.filter(t=>{
    t.taskStartDate = new Date(t.taskStartDate.year, t.taskStartDate.month -1, t.taskStartDate.day +1);
    t.taskEndDate = new Date(t.taskEndDate.year, t.taskEndDate.month -1, t.taskEndDate.day + 1);

    return true;
  }).map(e=>{return e});

  this.projectService.updateProject(window.localStorage.getItem('projectOnEditId'), {task: dataToBeUpdated}).subscribe(
    data=>{
      this.OpennedProject = data;

      // converting Project's Date to NgbDate
      let convertingToNgbDate = new Date(data.projectStartDate);
      this.OpennedProject.projectStartDate = new NgbDate(convertingToNgbDate.getUTCFullYear(), convertingToNgbDate.getUTCMonth() + 1, convertingToNgbDate.getUTCDate());
      this.OpennedProject.projectEndDate = this.calendar.getNext(data.projectStartDate, 'd', data.projectDuration);


      // converting task dates to NgbDate
      this.OpennedProject.task.forEach((task)=>{
        if (task.taskDuration){
        let taskStartDates = new Date(task.taskStartDate);
        task.taskStartDate = new NgbDate(taskStartDates.getUTCFullYear(), taskStartDates.getUTCMonth() + 1, taskStartDates.getUTCDate());
        task.taskEndDate = this.calendar.getNext(task.taskStartDate, 'd', task.taskDuration);
        }
      })


      this.notifyService.showSuccess('Task Added', 'Success');
    },
    error=>{
      this.notifyService.showError('Could Not Add Task', 'Error !!');
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

this.projectService.updateProject(window.localStorage.getItem('projectOnEditId'), this.costPriorForm.value).subscribe(
  data=>{
    this.notifyService.showSuccess("Changes Saved", "Success")
  },
  error=>{
    this.notifyService.showError("Changes Not saved", "Error !")
  }
)


}






//
}
//