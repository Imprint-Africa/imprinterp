import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DocPadService } from 'src/app/shared/services/doc-pad.service';
import { SanitizeHtmlPipe } from 'src/app/shared/pipe/safePipe';
import { SpinnerService } from 'src/app/shared/services/spinner.service';





@Component({
    selector: 'app-document-pad',
    templateUrl: './document-pad.component.html',
    styleUrls: ['./document-pad.component.sass']
})


export class DocumentPadComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifyService: NotificationService,
    private docPadService: DocPadService,
    private spinnerService: SpinnerService,
  ) { }
// tslint:disable: prefer-const
// tslint:disable: object-literal-shorthand

public Quillconfig = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],               // custom button values
    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
    [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
    [{ direction: 'rtl' }],                         // text direction

    [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],                                         // remove formatting button

    ['link', 'image', 'video']                         // link and image, video
  ]
};

// Modal
@ViewChild('saveModal') public saveModal: ModalDirective;
@ViewChild('deleteModal') public deleteModal: ModalDirective;

public saveTitleForm: FormGroup;
public saveAsTitleForm: FormGroup;

editorStyling = {
  height: '430px',
  backgroundColor: '#f0f3f5',
  fontSize: '12px',
  fontFamily: 'Montserrat'
};


public documentId;
public documentTitle: string;
public documentContent: string;

public PadDocuments = [];

public docOpened;

public docToBeEdited;
public docToBeDeleted;

public editorSectionStatus: boolean;
public viewSectionStatus: boolean;
public listSectionStatus: boolean;


ngOnInit() {

  window.localStorage.setItem('ActiveNav', 'document');

  this.listSectionStatus = true;
  this.viewSectionStatus = false;
  this.editorSectionStatus = false;

  this.docPadService.getAllPad().subscribe(
    data => {
      this.PadDocuments = data;
    },
    error => { console.log('Error getting All Documents'); }
  );

  this.docPadService.listPad().subscribe(
    data => {
      this.PadDocuments = data;
    },
    error => { console.log('Error Listing All Documents'); }
  );

  this.saveTitleForm = this.formBuilder.group({
    title: ['', Validators.required],
  });

  this.saveAsTitleForm = this.formBuilder.group({
    title: ['', Validators.required],
  });

}// ngOnInit

get formSaveTitle() {return this.saveTitleForm.controls; }
get formSaveAsTitle() {return this.saveAsTitleForm.controls; }



saveDoc(id) {

  if (this.docToBeEdited.title === 'New Document' && this.docToBeEdited._id === null) {

    this.saveModal.show();

  } else {
    this.spinnerService.spinStart();
    this.docPadService.updatePad(id, {content: this.docToBeEdited.content}).subscribe(
      data => {
        this.spinnerService.spinStop();
        this.notifyService.showSuccess('Document Updated', 'Success');
        this.docToBeEdited = data;
      },
      error => {
        this.spinnerService.spinStop();
        this.notifyService.showError('Could Not Created New Document', 'Failed'); }
    );

  }
}



saveAsDoc() {
  this.saveModal.show();
}


submitNewDoc() {
  this.spinnerService.spinStart();
  let dataToBeSent = {
    title: this.saveTitleForm.value.title,
    content: this.docToBeEdited.content,
    createdOn: new Date(),
    createdBy: localStorage.getItem('loggedUserName')
  };

  this.docPadService.createPad(dataToBeSent).subscribe(
    data => {
      this.spinnerService.spinStop();
      this.notifyService.showSuccess('New Document Created', 'Success');
      this.docToBeEdited = data;

    },
    error => {
      this.spinnerService.spinStop();
      this.notifyService.showError('Could Not Created New Document', 'Failed'); }
  );

  // this.docOpened = dataToBeSent;
}

createNew() {
  this.docToBeEdited = {
    _id: null,
    title: 'New Document',
    content: ''
  };
  this.listSectionStatus = false;
  this.viewSectionStatus = false;
  this.editorSectionStatus = true;
  this.notifyService.showInfo('New Document', 'Info...');
}



viewDocument(id) {
  this.PadDocuments.forEach((doc) => {
    if (doc._id === id) {
      this.docOpened = doc;
      this.listSectionStatus = false;
      this.viewSectionStatus = true;
      this.editorSectionStatus = false;
    }
  });

}


loaded() {
  console.log('Loaded');
}

editDocument(id) {

  this.PadDocuments.forEach((doc) => {
    if (doc._id === id) {
      this.docToBeEdited = doc;
      this.listSectionStatus = false;
      this.viewSectionStatus = false;
      this.editorSectionStatus = true;
      console.log('you')

    }
  });

}

listDocuments() {
  this.spinnerService.spinStart();
  this.listSectionStatus = true;
  this.viewSectionStatus = false;
  this.editorSectionStatus = false;
  this.spinnerService.spinStop();
}

deleteDocument(id) {
  this.PadDocuments.forEach((doc) => {
    if (doc._id === id) {
      this.docToBeDeleted = doc;
      this.deleteModal.show();
    }
  });

}

submitDeleted() {
  this.spinnerService.spinStart();
  this.docPadService.deletePad(this.docToBeDeleted._id).subscribe(
    data => {
      this.spinnerService.spinStop();
      this.notifyService.showSuccess('Documented Deleted', 'Success');

    },
    error => {
      this.spinnerService.spinStop();
      this.notifyService.showError('Could Not Delete Document', 'Failed');
    }
  );
}

}// Class DocumentBoardComponent
