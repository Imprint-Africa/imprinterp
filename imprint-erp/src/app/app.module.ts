import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from "ng-sidebar";
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from 'ng2-charts';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';


// Servicesn

import { UserService } from './shared/services/user.service';
import { NotificationService } from './shared/services/notification.service';

// Auth Guard
import { AuthGuard } from './shared/guards/auth.guard';
import { ProjectBoardsComponent } from './components/home/projects/project-boards/project-boards.component';
import { SalesBoardComponent } from './components/home/sales/sales-board/sales-board.component';
import { SalesService } from './shared/services/sales.service';
import { SalesEditComponent } from './components/home/sales/sales-edit/sales-edit.component';
import { ProjTaskTeamComponent } from './components/home/editorial/proj-task-team/proj-task-team.component';
import { TeamsService } from './shared/services/teams.service';
import { CustomaryService } from './shared/services/customary.service';
import { SalesCategoryService } from './shared/services/sales-category.service';
import { ProjectsService } from './shared/services/projects.service';
import { UpdateProjectComponent } from './components/home/projects/update-project/update-project.component';
import { ProjectDetailsComponent } from './components/home/projects/project-details/project-details.component';
import { GanttComponent } from './components/home/projects/project-details/gantt/gantt.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProjectBoardsComponent,
    SalesBoardComponent,
    SalesEditComponent,
    ProjTaskTeamComponent,
    UpdateProjectComponent,
    ProjectDetailsComponent,
    GanttComponent,
    DashboardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    })
  ],
  providers: [NotificationService, AuthGuard, UserService, SalesService, TeamsService, CustomaryService, SalesCategoryService, ProjectsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
