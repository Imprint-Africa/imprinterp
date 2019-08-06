import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SidebarModule } from "ng-sidebar";
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';


// Services

import { UserService } from './shared/services/user.service';
import { NotificationService } from './shared/services/notification.service';

// Auth Guard
import { AuthGuard } from './shared/guards/auth.guard';
import { ProjectBoardsComponent } from './components/home/projects/project-boards/project-boards.component';
import { SalesBoardComponent } from './components/home/sales/sales-board/sales-board.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProjectBoardsComponent,
    SalesBoardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
  ],
  providers: [ UserService, NotificationService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
