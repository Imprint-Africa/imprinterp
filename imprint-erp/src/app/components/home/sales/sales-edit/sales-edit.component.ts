import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SalesService } from 'src/app/shared/services/sales.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.sass']
})
export class SalesEditComponent implements OnInit {

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private salesService: SalesService,
    private notifyService: NotificationService
  ) { }





// Variables
@ViewChild('mySalesEditForm') mySalesEditFormValues;
public salesEditForm: FormGroup;



// Initialize
  ngOnInit() {

    
    // Pass form values
    this.salesEditForm=this.formBuilder.group({
      clientName: ['Safaricom',Validators.required],
      projectType: ['Branding', Validators.required],
      revenue: [''],
      priority: ['0'],
      status: ['1']
    });

  }



 // conveniently get the values from the form fields
 get form() {return this.salesEditForm.controls;}


}
