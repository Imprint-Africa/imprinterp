import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SalesService } from 'src/app/shared/services/sales.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';

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
    private salesService: SalesService,
    private projectService: ProjectsService,
    private notifyService: NotificationService
  ) { 
  }


// Variables
@ViewChild('myCostPriorForm') myCostPriorFormValues;
public costPriorForm: FormGroup;



// Status
public listClickedStatus;
public taskDetailsStatus;
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
    this.projectCalenderStatus = false;

    /// set dates
    this.taskFromDate = this.calendar.getToday();
    this.taskToDate = null;


    if(window.localStorage.getItem('salesEditItemId')){

    // Get The project For Editing
        this.salesService.getOppProject(window.localStorage.getItem('salesEditItemId')).subscribe(

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
        
        }else{
          this.router.navigate(['/sales']);
        }


      // Pass form values
      this.costPriorForm=this.formBuilder.group({
        cost: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        priority: null
      });
    
    



//  -----   
  }
// -----



 // conveniently get the values from the form fields
 get formCostPrior() {return this.costPriorForm.controls;}




// Toogle calender
taskDetailsToggle(id){
  this.listClickedStatus = id;
  this.taskDetailsStatus = !this.taskDetailsStatus;
}


projectCalenderToggle(){
  this.projectCalenderStatus = !this.projectCalenderStatus;

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
      this.OpennedProject = data;
      let startdates = new Date(data.projectStartDate);
      this.projectFromDate = new NgbDate(startdates.getUTCFullYear(), startdates.getUTCMonth() + 1, startdates.getUTCDate());
      this.projectToDate = this.calendar.getNext(this.projectFromDate, 'd', data.projectDuration);

      this.OpennedProject.projectStartDate = this.projectFromDate;
      this.OpennedProject.projectEndDate = this.projectToDate;

      this.taskMinDate = this.projectFromDate;
      this.taskMaxDate = this.projectToDate;
      this.notifyService.showSuccess('Dates Changes Saved', 'Success');
      this.projectCalenderStatus = !this.projectCalenderStatus;
    },
    error=>{
      this.notifyService.showError('No Changes are Saved', 'Error');

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
          t.taskDuration = this.taskDuration;
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

      this.OpennedProject.task = data.task;


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












// Set priority
selectPriority(num){
  this.projPriority = num;
}





// Save Changes 

saveChanges(){


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
