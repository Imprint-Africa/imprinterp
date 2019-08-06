import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';
import { ProjectBoardsComponent } from './components/home/projects/project-boards/project-boards.component';
import { SalesBoardComponent } from './components/home/sales/sales-board/sales-board.component';

const routes: Routes = [
  // login
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},

  // Projects
  {path: 'projects', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: ProjectBoardsComponent }]
  },

  // Sales
  {path: 'sales', component: HomeComponent, canActivate: [AuthGuard],
  children: [{ path: "", component: SalesBoardComponent }]
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
