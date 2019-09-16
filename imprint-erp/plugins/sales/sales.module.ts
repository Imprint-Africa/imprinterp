import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { ModalModule } from "ngx-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { SalesRoutingModule } from './sales.routing.module';
import { FilterPipeModule } from 'ngx-filter-pipe';

// components
import { SalesBoardComponent } from './sales-board/sales-board.component';
import { SalesEditComponent } from './sales-edit/sales-edit.component';


@NgModule({

declarations: [
    SalesBoardComponent, SalesEditComponent
        ],

  imports: [
    BrowserModule,
    SalesRoutingModule,
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
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    })
  ],
  entryComponents: [SalesBoardComponent, SalesEditComponent]
})
export class SalesModule {}

@NgModule({})
export class SalesSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SalesModule,
      providers: []
    }
  }
}
