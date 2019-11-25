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
    private router: Router,
    private notifyService: NotificationService
  ) { }
// tslint:disable: prefer-const
// tslint:disable: object-literal-shorthand


  // variables
  public Projects: any = [];






  // initialize
  ngOnInit() {

    window.localStorage.setItem('ActiveNav', 'projects');

    this.projectsService.getAllProject().subscribe(
      data => {
        this.Projects = data.reverse();
      },
      error => {
        console.log('Could get all Projects');
      }
    );

    // Project Lists
    this.projectsService.listProject().subscribe(
      data => {
        this.Projects = data.reverse();
      },
      error => {
        console.log('could not list projects');
      }
    );


  }






// to modify

toModifyCard(id) {

  window.localStorage.setItem('projectOnEditId', id);
  this.router.navigate(['projects/project_update']);


}




}
