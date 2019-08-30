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
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { CustomServiceEditComponent } from './components/home/editorial/custom-service-edit/custom-service-edit.component';
import { EditProjectComponent } from './components/home/projects/edit-project/edit-project.component';

const routes: Routes = [
  // login
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},

  // Dashbords
  {path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: DashboardComponent }]
  },

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
 
  
  // Projects Details
  {path: 'project_edit', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: EditProjectComponent }]
  },

  // Sales
  {path: 'sales', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: SalesBoardComponent }]
  },
  
  // Sales Edit
  {path: 'sales_edit', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: SalesEditComponent }]
  },


  // Editorial
  {path: 'editorial', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: ProjTaskTeamComponent }]
  },

  // Custom Servcie Edit
  {path: 'custom_service_edit', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: CustomServiceEditComponent }]
  },
  

  // Register
  {path: 'users', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: RegisterComponent }]
  },

  {path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
