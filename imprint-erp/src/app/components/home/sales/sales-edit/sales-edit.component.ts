import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
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
public lauchStatus;


// Binded Variables

public OpennedProject: any;
public OpennedProjectTasks: any = [];
public TaskNumber: number;
public projPriority: string;


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




    this.listClickedStatus = null;
    this.taskDetailsStatus = false;
    this.lauchStatus = false;

    /// set dates
    
    
    this.taskFromDate = this.calendar.getToday();
    this.taskToDate = null;



    if(window.localStorage.getItem('salesEditItemId')){

    // Get The project For Editing
        this.salesService.getOppProject(window.localStorage.getItem('salesEditItemId')).subscribe(

          data=>{

            this.OpennedProject = data;
            this.projPriority = data.priority;

            // set Date
            if(data.projectStartDate === null){
              this.projectFromDate = this.calendar.getToday();
              this.taskMinDate = this.projectFromDate;
              this.taskMaxDate = this.calendar.getNext(this.taskMinDate, 'd', 7);
              this.projectToDate = null;           
            }else{
              let startdates = new Date(data.projectStartDate);
              this.projectFromDate = new NgbDate(startdates.getUTCFullYear(), startdates.getUTCMonth() + 1, startdates.getUTCDate());
              this.projectToDate = this.calendar.getNext(this.projectFromDate, 'd', data.projectDuration);
              this.taskMinDate = this.projectFromDate;
              this.taskMaxDate = this.projectToDate;
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


 
ngOnDestroy(){
  window.localStorage.removeItem('salesEditItemId');
}





// Toogle calender
taskDetailsToggle(id){
  this.listClickedStatus = id;
  this.taskDetailsStatus = !this.taskDetailsStatus;
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
      let startdates = new Date(data.projectStartDate);
      this.projectFromDate = new NgbDate(startdates.getUTCFullYear(), startdates.getUTCMonth() + 1, startdates.getUTCDate());
      this.projectToDate = this.calendar.getNext(this.projectFromDate, 'd', data.projectDuration);
      this.taskMinDate = this.projectFromDate;
      this.taskMaxDate = this.projectToDate;
      this.notifyService.showSuccess('Dates Changes Saved', 'Success');
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
          t.taskStartDate = new Date(this.taskFromDate.year, this.taskFromDate.month -1, this.taskFromDate.day);
          t.taskEndDate = new Date(this.taskToDate.year, this.taskToDate.month -1, this.taskToDate.day);
          t.taskStatus = 'checked';
    }

  })

  this.salesService.updateOppProject(window.localStorage.getItem('salesEditItemId'), {task : this.OpennedProject.task}).subscribe(
    data=>{
      this.notifyService.showSuccess('Task Updated', 'Success');
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

      setTimeout(()=>{
        this.router.navigate(['/sales'])
      },5000)

    },
    error=>{
      this.notifyService.showError("Changes Not saved", "Error !")
    }
  )
 

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
          },5000)
    },
    error =>{
      this.notifyService.showError("Projects Not Deleted", "Failled");
    }

  )

}




// === end ===
}
