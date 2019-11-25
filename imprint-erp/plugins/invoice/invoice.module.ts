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
import { NgxSpinnerModule } from 'ngx-spinner';
import { InvoiceRoutingModule } from './invoice.routing.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { QuillModule } from 'ngx-quill';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {  AmazingTimePickerModule } from 'amazing-time-picker';


// components
import { InvoiceBoardComponent } from './invoice-board/invoice-board.component';

@NgModule({

declarations: [
    InvoiceBoardComponent
        ],

  imports: [
    BrowserModule,
    InvoiceRoutingModule,
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
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    AmazingTimePickerModule
  ],
  entryComponents: [InvoiceBoardComponent]
})
export class InvoiceModule {}

@NgModule({})
export class InvoiceSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InvoiceModule,
      providers: []
    };
  }
}
