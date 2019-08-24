import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { GanttComponent } from 'src/app/components/home/projects/project-details/gantt/gantt.component';





@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.sass']
})



export class ProjectDetailsComponent implements OnInit {





  constructor(
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private teamsService: TeamsService,
    private router : Router,
    private notifyService: NotificationService,
    // private gantt: GanttComponent
  ) { }

@ViewChild(GanttComponent) gantt;
@ViewChild('myAddTaskForm') myAddTaskFormValues;
@ViewChild('taskDefineInput') taskDefineInputField: ElementRef;
public addTaskForm: FormGroup;



public oppennedProject;
public Teams : any = [];

public addTaskSectionStatus: boolean;
public addTaskFormStatus: boolean;
public setTaskDateStatus: boolean;

// Calender Variable

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
      this.addTaskSectionStatus = false;


        // load the Project on Initialization
        this.projectsService.getProject(window.localStorage.getItem('projectOnEditId')).subscribe(
          data=>{ 
            this.gantt.ngOnInit();
            this.oppennedProject = data;

            // converting Project's Date to NgbDate
            let convertingToNgbDate = new Date(data.projectStartDate);
            this.oppennedProject.projectStartDate = new NgbDate(convertingToNgbDate.getUTCFullYear(), convertingToNgbDate.getUTCMonth() + 1, convertingToNgbDate.getUTCDate());
            this.oppennedProject.projectEndDate = this.calendar.getNext(data.projectStartDate, 'd', data.projectDuration);

            this.taskMinDate = this.oppennedProject.projectStartDate;
            this.taskMaxDate = this.oppennedProject.projectEndDate;
 
            this.taskFromDate = this.taskMinDate;
            this.taskToDate = null;

            // converting task dates to NgbDate
            this.oppennedProject.task.forEach((task)=>{
              if (task.taskDuration){
              let taskStartDates = new Date(task.taskStartDate);
              task.taskStartDate = new NgbDate(taskStartDates.getUTCFullYear(), taskStartDates.getUTCMonth() + 1, taskStartDates.getUTCDate());
              task.taskEndDate = this.calendar.getNext(task.taskStartDate, 'd', task.taskDuration);
              }
            })

          },
          error=>{
            console.log('Error');
          }
        )

        
        // List Teams
        this.teamsService.listTeams().subscribe(
          data=>{
              this.Teams = data;
          },
          error=>{
            console.log(error)
          }
        )

              // add Tasks
        this.addTaskForm=this.formBuilder.group({
              taskName: ['', Validators.required],
              assignedTeam: ['', Validators.required],
              taskStatus: ['checked'],
              taskDuration: [null],
              taskStartDate: [null],
              taskEndDate: [null],
        });


     }
     else{
      this.router.navigate(['/projects']);
    }

// ---- 
  }





get formAddTask(){ return this.addTaskForm.controls;}




moveBackToTeams(){
  this.router.navigate(['/project_update']);
}
  




toggleAddTaskForm(){
  this.addTaskSectionStatus = !this.addTaskSectionStatus;
  this.addTaskFormStatus = true;
  this.setTaskDateStatus = false;
  this.taskDefineInputField.nativeElement.focus();
}






showCalender(){
  this.addTaskFormStatus = false;
  this.setTaskDateStatus = true;
}






addTask(){
  this.addTaskForm.value.taskDuration = this.taskDuration;
  this.addTaskForm.value.taskStartDate = this.taskFromDate;
  this.addTaskForm.value.taskEndDate = this.taskToDate;

  this.oppennedProject.task.push(this.addTaskForm.value);

  let dataToBeUpdated = this.oppennedProject.task.filter(t=>{
    t.taskStartDate = new Date(t.taskStartDate.year, t.taskStartDate.month -1, t.taskStartDate.day +1);
    t.taskEndDate = new Date(t.taskEndDate.year, t.taskEndDate.month -1, t.taskEndDate.day + 1);

    return true;
  }).map(e=>{return e});

  this.projectsService.updateProject(window.localStorage.getItem('projectOnEditId'), {task: dataToBeUpdated}).subscribe(
    data=>{
      console.log(data)
      this.oppennedProject = data;

      // converting Project's Date to NgbDate
      let convertingToNgbDate = new Date(data.projectStartDate);
      this.oppennedProject.projectStartDate = new NgbDate(convertingToNgbDate.getUTCFullYear(), convertingToNgbDate.getUTCMonth() + 1, convertingToNgbDate.getUTCDate());
      this.oppennedProject.projectEndDate = this.calendar.getNext(data.projectStartDate, 'd', data.projectDuration);


      // converting task dates to NgbDate
      this.oppennedProject.task.forEach((task)=>{
        if (task.taskDuration){
        let taskStartDates = new Date(task.taskStartDate);
        task.taskStartDate = new NgbDate(taskStartDates.getUTCFullYear(), taskStartDates.getUTCMonth() + 1, taskStartDates.getUTCDate());
        task.taskEndDate = this.calendar.getNext(task.taskStartDate, 'd', task.taskDuration);
        }
      })

      this.gantt.ngOnInit();
      this.notifyService.showSuccess('Task Added', 'Success');
      this.addTaskSectionStatus = false
    },
    error=>{
      this.notifyService.showError('Could Not Add Task', 'Error !!');
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

















// On Destroy
ngOnDestroy(){
  // window.localStorage.removeItem('projectOnEditId');
}



// === END ==  
}
