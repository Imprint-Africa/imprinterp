import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectsSharedModule } from 'plugins/projects/projects.module';
import { EditorialSharedModule } from 'plugins/editorial/editorial.module';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UsersComponent } from './components/home/users/users.component';
import { SalesSharedModule } from 'plugins/sales/sales.module';
import { DashboardSharedModule } from 'plugins/dashboard/dashboard.module';


const routes: Routes = [

  // Login
  {path: 'login', component: LoginComponent},

  // Register
  {path: 'register', component: RegisterComponent},

   // Users
  {path: 'users', component: HomeComponent, canActivate: [AuthGuard],
    children: [{ path: "", component: UsersComponent}]
  },

  
    // Project Module
  { path: "", loadChildren: 'plugins/projects/projects.module#ProjectsSharedModule'},

    // Editorial Module
  { path: "", loadChildren: 'plugins/editorial/editorial.module#EditorialSharedModule'},

  // Sales Module
  { path: "", loadChildren: 'plugins/sales/sales.module#SalesSharedModule'}, 

   // Dashboard Module
  { path: "", loadChildren: 'plugins/dashboard/dashboard.module#DashboardSharedModule'}, 

];

@NgModule({
  imports: [
            RouterModule.forRoot(routes),
            ProjectsSharedModule.forRoot(),
            EditorialSharedModule.forRoot(),
            SalesSharedModule.forRoot(),
            DashboardSharedModule.forRoot()
            ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
