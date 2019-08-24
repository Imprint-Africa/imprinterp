import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';
import { ProjectBoardsComponent } from './components/home/projects/project-boards/project-boards.component';
import { SalesBoardComponent } from './components/home/sales/sales-board/sales-board.component';
import { SalesEditComponent } from './components/home/sales/sales-edit/sales-edit.component';
import { ProjTaskTeamComponent } from './components/home/editorial/proj-task-team/proj-task-team.component';
import { UpdateProjectComponent } from './components/home/projects/update-project/update-project.component';
import { ProjectDetailsComponent } from './components/home/projects/project-details/project-details.component';

const routes: Routes = [
  // login
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},

  // Projects
  {path: 'projects', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: ProjectBoardsComponent }]
  },

  // Update Projects
  {path: 'project_update', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: UpdateProjectComponent }]
  },

  // Projects Details
  {path: 'project_details', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: ProjectDetailsComponent }]
  },
  

  // Sales
  {path: 'sales', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: SalesBoardComponent }]
  },
  
  // Sales Edit
  {path: 'sales_edit', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: SalesEditComponent }]
  },


  // ProjTaskTeams
  {path: 'proj_task_team', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: ProjTaskTeamComponent }]
  },

  // Register
  {path: 'register', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: RegisterComponent }]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
