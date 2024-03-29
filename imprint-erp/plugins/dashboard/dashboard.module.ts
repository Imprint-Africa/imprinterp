import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'ng-sidebar';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap';
import { DashboardRoutingModule } from './dashboard.routing.module';

// components
import { DashboardComponent } from './dashboard.component';
import { SalesDashboardComponent } from './salesDashboard/salesDashboard.component';
import { ProjectsDashboardComponent } from './projectsDashboard/projectsDashboard.component';


@NgModule({

declarations: [
    DashboardComponent,
    SalesDashboardComponent,
    ProjectsDashboardComponent
        ],

  imports: [
    BrowserModule,
    DashboardRoutingModule,
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
    })
  ],
  entryComponents: [DashboardComponent, SalesDashboardComponent, ProjectsDashboardComponent]
})
export class DashboardModule {}

@NgModule({})
export class DashboardSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: []
    };
  }
}
