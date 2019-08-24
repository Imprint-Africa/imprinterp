import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SalesService } from 'src/app/shared/services/sales.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SalesCategoryService } from 'src/app/shared/services/sales-category.service';
import { CustomaryService } from 'src/app/shared/services/customary.service';


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
    private notifyService: NotificationService,
    private salesCategoryService: SalesCategoryService,
    private customService: CustomaryService
  ) { }






// Variables
  @ViewChild('myNewClientForm') myNewClientFormValues;
  @ViewChild('clientInput') clientInput: ElementRef
  public newClientForm: FormGroup;


  @Input() listIndex: number;
  @Input() cardIndex: number;


// Status
public FormStatus: boolean;






// Binded Variables
public SalesCategorys: any = [];
public Opportunitys: any = [];
public Projects: any = [];
public ProjectSatus: string;
public Tasks: any = [];

public myInterval: any;







  // Initialisation Hook
  ngOnInit() {

    window.localStorage.setItem('ActiveNav', 'sales');
    this.FormStatus = false;


      // List Sales category
    this.salesCategoryService.listSalesCategory().subscribe(

        data=>{
            this.SalesCategorys = data;
          },
        error=>{
            console.log(error)
          }
      )






    // Pass form values
    this.newClientForm=this.formBuilder.group({
      projectName: ['', Validators.required],
      clientName: ['', Validators.required],
      task : [{
          taskName: [''],
          assignedTeam: [''],
          taskStatus: [''],
          taskDuration: null,
          taskStartDate: null,
          taskEndDate: null
      }],
      cost: null,
      priority: null,
      projectStatus: [''],
      projectDuration: null,
      projectStartDate: null,
      projectEndDate: null
    });




      // List Opportunities

  this.salesService.listOppProject().subscribe(
    data=>{
      this.Opportunitys = data;
    },
    error=>{
      console.log(error)
    }
  )



    // List custom services 
    this.customService.listServices().subscribe(
      data=>{
          this.Projects = data;
      },
      error=>{
        console.log(error)
      }
    )

      // Updating the component every 0.7 seconds
      this.myInterval = setInterval(()=>{
        this.UpdateSalesCategories();
      }, 700)


    


// -----------------------------------
  }
//------------------------------------




 // conveniently get the values from the form fields
 get formNewClient() {return this.newClientForm.controls;}


 toggleFormInput(currentCat){
   this.FormStatus = !this.FormStatus;

   this.SalesCategorys.forEach((cat)=>{
      return cat.name = currentCat ? this.ProjectSatus = currentCat : '';
   })

   
 }





 UpdateSalesCategories(){

  this.SalesCategorys.forEach((category)=>{

    let OppInThisCategory = this.Opportunitys.filter((opp)=>{
      return opp.projectStatus === category.name ? true : false
    }).map((e)=>{return e});

    let dataToBeUpdated = {
      totalLeads: OppInThisCategory.length,
      totalRevenue: OppInThisCategory.reduce(function(previous, current){ return previous + current.cost}, 0)
    }

    this.salesCategoryService.updateSaleCategory(category._id, dataToBeUpdated).subscribe(
      data=>{
        this.SalesCategorys = data;
      }
    )

  })

 }



    

  // Add New Client FunCtion
submitNewClientForm(){

    // Adding abjects to task array
    this.Projects.forEach((proj)=>{
      return proj.serviceName === this.newClientForm.value.projectName ?

      this.Tasks = proj.task.filter((a)=>{
          a.taskStatus = 'unChecked';
          a.taskDuration =  null;
          a.taskStartDate = null;
          a.taskEndDate = null;
          return true
        }).map(a=>{return a}) : 


       '';


    })


    let structuredData = {
      projectName: this.newClientForm.value.projectName,
      clientName: this.newClientForm.value.clientName,
      task : this.Tasks,
      cost: null,
      priority: 1,
      projectStatus: this.ProjectSatus,
      projectDuration: null,
      projectStartDate: null,
      projectEndDate: null
    }

    this.salesService.addOppProject(structuredData).subscribe(
      data => { 
        this.notifyService.showSuccess(`Client ${data.clientName} has been added`, "Success");
        this.FormStatus = !this.FormStatus;
        this.clientInput.nativeElement.value = '';
      },
      error => { this.notifyService.showError(error, "Failed...")}
    )
  }







  // Clear New Client Target Input Form
  clearNewClientForm(){
    this.clientInput.nativeElement.value = ''; 
    this.FormStatus = !this.FormStatus;
  }





  // To sales Edit

  toSalesEdit(id){

    this.router.navigate(['/sales_edit']);
    window.localStorage.setItem('salesEditItemId', id)
    
  }









  // Drag and Drop Functions
allowDrop(e){
  e.preventDefault();
}

drag(e){
  e.dataTransfer.setData('text', e.target.id);
}

drop(e){
  e.preventDefault();
  let CardId = e.dataTransfer.getData('text');
  let TargetId = e.target.id
  
  // Get Target Info
  this.salesCategoryService.getSaleCat(TargetId).subscribe(
    data=>{
  
      let updateData = {
        projectStatus: data.name
      }

      // Update

      this.salesService.updateOppProject(CardId, updateData).subscribe(
        data=>{
          this.notifyService.showSuccess("Card Moved", "Success")
    
        },
        error=>{
          this.notifyService.showError("Card did not move", "Error !")
        }
      )

      // ---
    },
    error=>{
      console.log(error)
    }
  )
}



// On Destroy
ngOnDestroy(){
  clearInterval(this.myInterval);
}




// === End ===  
}
