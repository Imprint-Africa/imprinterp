import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'ng-sidebar';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { QuillModule } from 'ngx-quill';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { NgCalenderComponent } from './components/angularCalender/ngCalender.component';

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
import { SpinnerService } from './shared/services/spinner.service';
import { CalenderEventService } from './shared/services/calenderEvent.service';
import { SalesNoteService } from './shared/services/sales-note.service';
import { DocPadService } from './shared/services/doc-pad.service';

// Modules
import { ProjectsSharedModule } from 'plugins/projects/projects.module';
import { EditorialSharedModule } from 'plugins/editorial/editorial.module';
import { SalesSharedModule } from 'plugins/sales/sales.module';
import { DashboardSharedModule } from 'plugins/dashboard/dashboard.module';
import { DocumentSharedModule } from 'plugins/document/document.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent,
    NotFoundComponent,
    NgCalenderComponent

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
    NgxSpinnerModule,
    FilterPipeModule,
    QuillModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    // import modules
    ProjectsSharedModule.forRoot(),
    EditorialSharedModule.forRoot(),
    SalesSharedModule.forRoot(),
    DashboardSharedModule.forRoot(),
    DocumentSharedModule.forRoot()

  ],
  providers: [NotificationService, AuthGuard, UserService, SalesService, TeamsService, CustomaryService,
              SalesCategoryService, ProjectsService, UserSalesStagesService, ClientService, SpinnerService,
               CalenderEventService, SalesNoteService, DocPadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
