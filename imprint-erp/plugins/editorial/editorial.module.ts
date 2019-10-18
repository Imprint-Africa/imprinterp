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
import { EditorialRoutingModule } from './editorial.routing.module';



// components
import { CustomServiceEditComponent } from './custom-service-edit/custom-service-edit.component';
import { ProjTaskTeamComponent } from './proj-task-team/proj-task-team.component';


@NgModule({

declarations: [
    CustomServiceEditComponent, ProjTaskTeamComponent
        ],

  imports: [
    BrowserModule,
    EditorialRoutingModule,
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
  entryComponents: [CustomServiceEditComponent, ProjTaskTeamComponent]
})
export class EditorialModule {}

@NgModule({})
export class EditorialSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EditorialModule,
      providers: []
    };
  }
}
