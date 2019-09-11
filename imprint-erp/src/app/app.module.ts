import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from "ngx-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from "ng-sidebar";
import { ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from 'ng2-charts';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';


// Services
import { UserService } from './shared/services/user.service';
import { NotificationService } from './shared/services/notification.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { SalesService } from './shared/services/sales.service';
import { TeamsService } from './shared/services/teams.service';
import { CustomaryService } from './shared/services/customary.service';
import { SalesCategoryService } from './shared/services/sales-category.service';
import { ProjectsService } from './shared/services/projects.service';
import { UsersComponent } from './components/home/users/users.component';
import { UserSalesStagesService } from './shared/services/user-sales-stages.service';
import { ClientService } from './shared/services/client.service';

// Modules
import { ProjectsSharedModule } from 'plugins/projects/projects.module';
import { EditorialSharedModule } from 'plugins/editorial/editorial.module';
import { SalesSharedModule } from 'plugins/sales/sales.module';
import { DashboardSharedModule } from 'plugins/dashboard/dashboard.module';
import { NotFoundComponent } from './components/notFound/notFound.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent,
    NotFoundComponent
    
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
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),

    // import modules
    ProjectsSharedModule.forRoot(),
    EditorialSharedModule.forRoot(),
    SalesSharedModule.forRoot(),
    DashboardSharedModule.forRoot()

  ],
  providers: [NotificationService, AuthGuard, UserService, SalesService, TeamsService, CustomaryService,
              SalesCategoryService, ProjectsService, UserSalesStagesService, ClientService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
