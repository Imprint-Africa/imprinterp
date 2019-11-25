import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

// components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/home/users/users.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { NgCalenderComponent } from './components/angularCalender/ngCalender.component';

// Modules
import { ProjectsSharedModule } from 'plugins/projects/projects.module';
import { EditorialSharedModule } from 'plugins/editorial/editorial.module';
import { SalesSharedModule } from 'plugins/sales/sales.module';
import { DashboardSharedModule } from 'plugins/dashboard/dashboard.module';
import { DocumentSharedModule } from 'plugins/document/document.module';
import { InvoiceSharedModule } from 'plugins/invoice/invoice.module';



const routes: Routes = [

  // Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Register
  { path: 'register/:email/:token', component: RegisterComponent },

   // Users
  { path: 'users', component: HomeComponent, canActivate: [AuthGuard],
     children: [{ path: '', component: UsersComponent}]
  },

  // Calender
  { path: 'ngCalender', component: HomeComponent, canActivate: [AuthGuard],
     children: [{ path: '', component: NgCalenderComponent}]
  },

    // Project Module
  { path: 'projects', loadChildren: 'plugins/projects/projects.module#ProjectsSharedModule'},

    // Editorial Module
  { path: 'editorial', loadChildren: 'plugins/editorial/editorial.module#EditorialSharedModule'},

  // Sales Module
  { path: 'sales', loadChildren: 'plugins/sales/sales.module#SalesSharedModule'},

   // Dashboard Module
  { path: 'dashboard', loadChildren: 'plugins/dashboard/dashboard.module#DashboardSharedModule'},

  // Documents Module
  { path: 'document', loadChildren: 'plugins/document/document.module#DocumentSharedModule'},

  // Invoice Module
  { path: 'invoice', loadChildren: 'plugins/invoice/invoice.module#InvoiceSharedModule'},

  { path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [
            RouterModule.forRoot(routes),
            ProjectsSharedModule.forRoot(),
            EditorialSharedModule.forRoot(),
            SalesSharedModule.forRoot(),
            DashboardSharedModule.forRoot(),
            DocumentSharedModule.forRoot(),
            InvoiceSharedModule.forRoot()
            ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
