import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sales-board',
  templateUrl: './sales-board.component.html',
  styleUrls: ['./sales-board.component.sass']
})
export class SalesBoardComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }


  @ViewChild('myClientForm') formValues;

  public targetClientForm: FormGroup;

  ngOnInit() {

    this.targetClientForm=this.formBuilder.group({
      clientName: [''],
      projectType: ['']
    });

  }

}
