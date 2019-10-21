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
import { DocumentRoutingModule } from './document.routing.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { QuillModule } from 'ngx-quill';


// components
import { DocumentBoardComponent } from './document-board/document-board.component';
import { DocumentPadComponent } from './document-pad/document-pad.component';
import { SanitizeHtmlPipe } from 'src/app/shared/pipe/safePipe';

@NgModule({

declarations: [
    DocumentBoardComponent, DocumentPadComponent, SanitizeHtmlPipe
        ],

  imports: [
    BrowserModule,
    DocumentRoutingModule,
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
    })
  ],
  entryComponents: [DocumentBoardComponent, DocumentPadComponent]
})
export class DocumentModule {}

@NgModule({})
export class DocumentSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DocumentModule,
      providers: []
    };
  }
}
