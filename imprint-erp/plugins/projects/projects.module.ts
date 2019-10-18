import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'ng-sidebar';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap';
import { ProjectsRoutingModule } from './projects.routing.module';

// components
import { ProjectBoardsComponent } from './project-boards/project-boards.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { GanttComponent } from './project-details/gantt/gantt.component';


@NgModule({

declarations: [
    ProjectBoardsComponent, ProjectDetailsComponent, EditProjectComponent, UpdateProjectComponent, GanttComponent
        ],

  imports: [
    BrowserModule,
    ProjectsRoutingModule,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    })
  ],
  entryComponents: [ProjectBoardsComponent, ProjectDetailsComponent, EditProjectComponent, UpdateProjectComponent, GanttComponent]
})
export class ProjectsModule {}

@NgModule({})
export class ProjectsSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectsModule,
      providers: []
    };
  }
}
