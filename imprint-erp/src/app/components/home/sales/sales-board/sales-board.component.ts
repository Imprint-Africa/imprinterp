import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SalesService } from 'src/app/shared/services/sales.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-sales-board',
  templateUrl: './sales-board.component.html',
  styleUrls: ['./sales-board.component.sass']
})
export class SalesBoardComponent implements OnInit {

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private salesService: SalesService,
    private notifyService: NotificationService
  ) { }






// Variables
  @ViewChild('myAddClientForm') myAddClientFormValues;
  public targetClientForm: FormGroup;
  public targetClientFormStatus: boolean;
  public targetClients: any = [];








  // Initialisation Hook
  ngOnInit() {

    // toggle Form
    this.targetClientFormStatus= true;

    // Pass form values
    this.targetClientForm=this.formBuilder.group({
      clientName: ['', Validators.required],
      projectType: ['', Validators.required],
      revenue: [''],
      priority: ['0'],
      status: ['1']
    });

      // List Targeted Clients

  this.salesService.listRawProject().subscribe(
    data=>{
      this.targetClients = data
    },
    error=>{
      console.log(error)
    }
  )

// -----------------------------------
  }
//------------------------------------


 // conveniently get the values from the form fields
 get formClientTarget() {return this.targetClientForm.controls;}



  // Toggle Sidebar
  toggleTargetClient() {
    this.targetClientFormStatus = !this.targetClientFormStatus;
  }
    

  // Add New Client Target Funtion
  submitNewTargetClient(){
    this.salesService.addRawProject(this.targetClientForm.value).subscribe(
      data => { 
        this.notifyService.showSuccess(`Client ${data.clientName} has been added`, "Success")
        this.myAddClientFormValues.resetForm(); 
      },
      error => { this.notifyService.showError(error, "Failed...")}
    )
  }


  // Clear New Client Target Input Form
  clearNewTargetForm(){
    this.myAddClientFormValues.resetForm(); 
  }


  // To sales Edit

  toSalesEdit(){
    this.router.navigate(['/sales_edit']);
  }


}
