import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { ProjectBoardsComponent } from './projects/project-boards/project-boards.component';
import { ProjectTasksComponent } from './projects/project-tasks/project-tasks.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SidebarModule} from "ng-sidebar";
import { DevTeamComponent } from './teams/dev-team/dev-team.component';
import { BusinessdevelopmentTeamComponent } from './teams/businessdevelopment-team/businessdevelopment-team.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import { MessagesComponent } from './messages/messages.component';
import { CommunicationsAndPrTeamComponent } from './teams/communications-and-pr-team/communications-and-pr-team.component';
import { BoardComponent } from './sales/kanban/board/board.component';
import { ListComponent } from './sales/kanban/list/list.component';
import { DetailsComponent } from './sales/kanban/card/details/details.component';
import { SummaryComponent } from './sales/kanban/card/summary/summary.component';
import {ContentEditDirective} from "./shared/directives/content-edit.directive";
import { ContextMenuComponent } from './sales/kanban/context-menu/context-menu.component';
import { UxTeamTasksComponent } from './teams/dev-team/ux-team-tasks/ux-team-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateProjectComponent,
    ProjectBoardsComponent,
    ProjectTasksComponent,
    SidebarComponent,
    DevTeamComponent,
    BusinessdevelopmentTeamComponent,
    MessagesComponent,
    CommunicationsAndPrTeamComponent,
    ContentEditDirective,
    BoardComponent,
    ListComponent,
    DetailsComponent,
    SummaryComponent,
    ContextMenuComponent,
    UxTeamTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
