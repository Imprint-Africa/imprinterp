import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-document-board',
    templateUrl: './document-board.component.html',
    styleUrls: ['./document-board.component.sass']
})
export class DocumentBoardComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }
// tslint:disable: prefer-const
// tslint:disable: object-literal-shorthand


ngOnInit() {

  window.localStorage.setItem('ActiveNav', 'document');


}// ngOnInit

toNotePad() {
  this.router.navigate(['/document/pad_document']);
}

}// Class DocumentBoardComponent
