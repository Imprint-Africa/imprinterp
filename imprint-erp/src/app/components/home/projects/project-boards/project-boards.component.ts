import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-project-boards',
  templateUrl: './project-boards.component.html',
  styleUrls: ['./project-boards.component.sass']
})
export class ProjectBoardsComponent implements OnInit {

  constructor(
    private calendar: NgbCalendar,
    private projectsService: ProjectsService,
    private router : Router,
    private notifyService: NotificationService
  ) { }



  // variables
  public Projects : any = [];






  // initialize
  ngOnInit() {

    window.localStorage.setItem('ActiveNav', 'projects');

    // get Project Lists
    this.projectsService.listProject().subscribe(
      data=>{
        this.Projects = data;
        this.Projects.forEach(project=>{
          let convertingToNgbDate = new Date(project.projectStartDate);
          project.projectStartDate = new NgbDate(convertingToNgbDate.getUTCFullYear(), convertingToNgbDate.getUTCMonth() + 1, convertingToNgbDate.getUTCDate());
          project.projectEndDate = this.calendar.getNext(project.projectStartDate, 'd', project.projectDuration);
        })
        


      },
      error=>{
        console.log('Error');
      }
    )


  }






// to modify

toModifyCard(id){

  window.localStorage.setItem('projectOnEditId', id);
  this.router.navigate(['/project_update'])


}




}
