import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectBoardsComponent} from "./projects/project-boards/project-boards.component";
import {LoginComponent} from "./login/login.component";
import {CreateProjectComponent} from "./projects/create-project/create-project.component";
import {ProjectTasksComponent} from "./projects/project-tasks/project-tasks.component";
import {MessagesComponent} from "./messages/messages.component";
import {DevTeamComponent} from "./teams/dev-team/dev-team.component";
import {CommunicationsAndPrTeamComponent} from "./teams/communications-and-pr-team/communications-and-pr-team.component";
import {BoardComponent} from "./sales/kanban/board/board.component";
import {SummaryComponent} from "./sales/kanban/card/summary/summary.component";
import {UxTeamTasksComponent} from "./teams/dev-team/ux-team-tasks/ux-team-tasks.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectBoardsComponent},
  {path: 'sales', component: BoardComponent},
  {path: 'create-project', component: CreateProjectComponent},
  {path: 'teams', component: ProjectTasksComponent},
  {path: 'communicationsteamtasks', component: CommunicationsAndPrTeamComponent},
  {path: 'devteamtasks', component: DevTeamComponent},
  {path: 'ux-team-tasks', component: UxTeamTasksComponent},
  {path: 'messages', component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
