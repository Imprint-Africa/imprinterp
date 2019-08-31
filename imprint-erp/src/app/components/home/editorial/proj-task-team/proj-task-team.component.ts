import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { CustomaryService } from 'src/app/shared/services/customary.service';
import { SalesCategoryService } from 'src/app/shared/services/sales-category.service';

@Component({
  selector: 'app-proj-task-team',
  templateUrl: './proj-task-team.component.html',
  styleUrls: ['./proj-task-team.component.sass']
})


export class ProjTaskTeamComponent implements OnInit {

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private notifyService: NotificationService,
    private teamsService: TeamsService,
    private customService: CustomaryService,
    private salesCategoryService: SalesCategoryService
  ) { }


// Modal
@ViewChild('editTeamModal') public editTeamModal: ModalDirective;
@ViewChild('deleteTeamModal') public deleteTeamModal: ModalDirective;
@ViewChild('editSalesCatModal') public editSalesCatModal: ModalDirective;
@ViewChild('deleteSalesCatModal') public deleteSalesCatModal: ModalDirective;


// Status Variables
public previewSectionStatus: boolean;
public customServiceSectionStatus: boolean;
public customServiceFormStatus: boolean;
public addTaskSectionStatus: boolean;
public defineTaskFormStatus: boolean;
public listAddTeamStatus: boolean;
public listAddSalesCategoryStatus: boolean;
public listStatus: boolean;

// Form Variables

@ViewChild('myAddTeamForm') myAddTeamFormValues;
@ViewChild('myAddSalesCategoryForm') myAddSalesCategoryFormValues;
@ViewChild('myCustomServiceForm') myCustomServiceFormValues;
@ViewChild('mydefineTaskForm') mydefineTaskFormValues;
@ViewChild('customServiceInput') customServiceInputField: ElementRef;
@ViewChild('taskDefineInput') taskField: ElementRef;

public addNewTeamForm: FormGroup;
public addSalesCategoryForm: FormGroup;
public customServiceForm: FormGroup;
public defineTaskForm: FormGroup;
public editServiceForm: FormGroup;
public editTeamForm: FormGroup;
public editSalesCatForm: FormGroup;




// Binded Variables
public Teams : any = [];
public SalesCategorys: any = [];
public namedCustomService: string;
public namedTargetRevenue: number;
public Tasks: any = [];
public Services: any = [];




// Edit Variables
public serviceTobeEdited;
public teamToBeEdited;
public teamToBeDeleted;
public salesCategoryToBeEdited;
public salesCategoryToBeDeleted;




// Initialize
  ngOnInit() {

  window.localStorage.setItem('ActiveNav', 'editorial');

    // status
  this.previewSectionStatus= false;
  this.customServiceSectionStatus= true;
  this.customServiceFormStatus= true;
  this.addTaskSectionStatus= false;
  this.defineTaskFormStatus= false;
  this.listAddSalesCategoryStatus= false;
  this.listAddTeamStatus=false;
  this.listStatus=true;





  // Add new Team
  this.addNewTeamForm=this.formBuilder.group({
    teamName: ['', Validators.required]
  });



  // List Teams
  this.teamsService.listTeams().subscribe(
    data=>{
        this.Teams = data;
    },
    error=>{
      console.log(error)
    }
  )




  // Add Sales Category
  this.addSalesCategoryForm=this.formBuilder.group({
    name: ['', Validators.required]
  });



  // List Sales category
  this.salesCategoryService.listSalesCategory().subscribe(
    data=>{
        this.SalesCategorys = data;
    },
    error=>{
      console.log(error)
    }
  )



  // Add new Custom Service Form
  this.customServiceForm=this.formBuilder.group({
    customServiceName: ['', Validators.required],
    targetRevenue: [null, Validators.required]
  });

  // define Tasks
  this.defineTaskForm=this.formBuilder.group({
    taskName: ['', Validators.required],
    assignedTeam: ['', Validators.required]
  });


  // List custom services 
  this.customService.listServices().subscribe(
    data=>{
        this.Services = data;
    },
    error=>{
      console.log(error)
    }
  )


  this.editServiceForm=this.formBuilder.group({
    serviceName: ['', Validators.required],
    targetRevenue: ['', Validators.required],
    task: {
      taskName: ['', Validators.required],
      assignedTeam: ['', Validators.required]
    }
  })

  this.editTeamForm=this.formBuilder.group({
    name: ['', Validators.required]
  })

  this.editSalesCatForm=this.formBuilder.group({
    name: ['', Validators.required]
  })



// ---
  }
// ---


 // conveniently get the values from the form fields
get formAddNewTeam() {return this.addNewTeamForm.controls;}
get formAddSalesCategory() {return this.addSalesCategoryForm.controls;}
get formCustomService() {return this.customServiceForm.controls;}
get formAddTask(){ return this.defineTaskForm.controls;}
get formEditService(){ return this.editServiceForm.controls;}
get formEditTeam(){ return this.editTeamForm.controls;}
get formSalesCatTeam(){ return this.editSalesCatForm.controls;}







// Open Team Form
openTeamForm(){

  this.previewSectionStatus= false;
  this.customServiceSectionStatus= false;
  this.customServiceFormStatus= false;
  this.addTaskSectionStatus = false;
  this.defineTaskFormStatus= false;
  this.listAddTeamStatus= !this.listAddTeamStatus;
  this.listAddSalesCategoryStatus= false;
  this.listStatus=false;
  setTimeout(()=>{ this.listStatus=true; }, 1000)

}









// Add Team
addTeam(){

  this.previewSectionStatus= false;
  this.customServiceSectionStatus= false;
  this.customServiceFormStatus= false;
  this.addTaskSectionStatus = false;
  this.defineTaskFormStatus= false;
  this.listAddTeamStatus= true;
  this.listAddSalesCategoryStatus= false;
  this.listStatus=false;
  setTimeout(()=>{ this.listStatus=true; }, 1000)

  let convertedData = {
                      name: this.addNewTeamForm.value.teamName.toLowerCase()
                    }

  this.teamsService.createTeam(convertedData).subscribe(
    data=>{ 
      this.notifyService.showSuccess(`Team ${data.name} has been added`, "Success");
      this.myAddTeamFormValues.resetForm();
    },
    error=>{ 
      this.notifyService.showError(error.error.message, "Failed...");
    }
  )

}









// Open Sales Cat Foem
openSalesCatForm(){

  this.previewSectionStatus= false;
  this.customServiceSectionStatus= false;
  this.customServiceFormStatus= false;
  this.addTaskSectionStatus = false;
  this.defineTaskFormStatus= false;
  this.listAddTeamStatus= false;
  this.listAddSalesCategoryStatus= !this.listAddSalesCategoryStatus;
  this.listStatus=false;
  setTimeout(()=>{ this.listStatus=true; }, 1000)

}










// Add Sales Category
addSalesCategory(){

  this.previewSectionStatus= false;
  this.customServiceSectionStatus= false;
  this.customServiceFormStatus= false;
  this.addTaskSectionStatus = false;
  this.defineTaskFormStatus= false;
  this.listAddTeamStatus= false;
  this.listAddSalesCategoryStatus=true;
  this.listStatus=false;
  setTimeout(()=>{ this.listStatus=true; }, 1000)

  let convertedData = {
                      name: this.addSalesCategoryForm.value.name.toLowerCase(),
                      totalLeads: 0,
                      totalRevenue: 0
                    }

  this.salesCategoryService.addSalesCategory(convertedData).subscribe(
    data=>{ 
      this.notifyService.showSuccess(`Category ${data.name} has been added`, "Success");
      this.myAddSalesCategoryFormValues.resetForm();
    },
    error=>{ 
      this.notifyService.showError(error.error.message, "Failed...");
    }
  )

}











// Add New Customary Service
openCustomServiceForm(){
  this.previewSectionStatus= false;
  this.customServiceSectionStatus = !this.customServiceSectionStatus;
  this.customServiceFormStatus = !this.customServiceFormStatus;
  this.addTaskSectionStatus= false;
  this.defineTaskFormStatus= false;
  this.listAddTeamStatus=false;
  this.listAddSalesCategoryStatus=false;
  this.listStatus=false;
  this.customServiceInputField.nativeElement.focus();
  setTimeout(()=>{ this.listStatus=true; }, 1000)

}  






// Move to task Form
moveToTaskForm(){

  this.previewSectionStatus= false;
  this.customServiceSectionStatus= false;
  this.customServiceFormStatus= false;
  this.addTaskSectionStatus= true;
  this.defineTaskFormStatus= true;
  this.listAddTeamStatus= false;
  this.listAddSalesCategoryStatus=false;
  this.listStatus=false;

  this.namedCustomService = this.customServiceForm.value.customServiceName.toLowerCase();
  this.namedTargetRevenue = this.customServiceForm.value.targetRevenue;
  this.myCustomServiceFormValues.resetForm();
  this.taskField.nativeElement.focus();

  setTimeout(()=>{ this.listStatus=true; }, 1000)


}




// Save add another tasks
addAnotherTask(){

  this.previewSectionStatus= true;
  this.customServiceSectionStatus= false;
  this.customServiceFormStatus= false;
  this.addTaskSectionStatus= true;
  this.defineTaskFormStatus= true;
  this.listAddTeamStatus= false;
  this.listAddSalesCategoryStatus=false;
  this.listStatus=false;

  this.Tasks.push(this.defineTaskForm.value);
  // this.mydefineTaskFormValues.resetForm();
  this.taskField.nativeElement.value = '';
  this.taskField.nativeElement.focus();

  setTimeout(()=>{ this.listStatus=true; }, 1000);

}



// Save and close Project Form
saveAndClose(){

  this.previewSectionStatus= false;
  this.customServiceSectionStatus= false;
  this.customServiceFormStatus= false;
  this.addTaskSectionStatus= false;
  this.defineTaskFormStatus= false;
  this.listAddTeamStatus=false;
  this.listAddSalesCategoryStatus=false;
  this.listStatus=false;
  setTimeout(()=>{ this.listStatus=true; }, 1000);

  this.Tasks.push(this.defineTaskForm.value);

  let convertedData = {
    serviceName : this.namedCustomService,
    task: this.Tasks,
    targetRevenue: this.namedTargetRevenue

  }

  this.mydefineTaskFormValues.resetForm();

  this.customService.createService(convertedData).subscribe(
    data=>{
      this.notifyService.showSuccess(`Service ${data.serviceName} has been added`, "Success");
    },
    error=>{
      this.notifyService.showError(error.error.message, "Failed..."); 
    }

  )

}







// Edit Custom Service
editCustomService(id){

  window.localStorage.setItem('IdServiceTobeEdited', id);
  this.router.navigate(['/custom_service_edit']);


}


identifyTeamToBeEdited(team){
  this.teamToBeEdited = team;
}


editTeam(){

  let data = this.editTeamForm.value.name.toLowerCase();

  this.teamsService.updateTeam(this.teamToBeEdited._id, {name: data}).subscribe(
    data=>{
      this.notifyService.showSuccess('Team Updated', 'Success');
    },
    error=>{
      this.notifyService.showError('Not Updated..', 'Error');
    }
    
  )
}



identifyTeamToBeDeleted(team){
  this.teamToBeDeleted = team;
}


deleteTeam(){

  this.teamsService.deleteTeam(this.teamToBeDeleted._id).subscribe(
    data=>{
      this.notifyService.showSuccess('Team Delete', 'Success');
    },
    error=>{
      this.notifyService.showError('Not Deleted..', 'Error');
    }
    
  )

}





identifySalesCatBeEdited(salesCat){
  this.salesCategoryToBeEdited= salesCat;
}


editSalesCategory(){

  let data = this.editSalesCatForm.value.name.toLowerCase();

  this.salesCategoryService.updateSaleCategory(this.salesCategoryToBeEdited._id, {name: data}).subscribe(
    data=>{
      this.notifyService.showSuccess('Sales Category Updated', 'Success');
    },
    error=>{
      this.notifyService.showError('Not Updated..', 'Error');
    }
    
  )
}



identifySalesCatToBeDeleted(salesCat){
  this.salesCategoryToBeDeleted = salesCat;
}


deleteSalesCategory(){

  this.salesCategoryService.deleteSaleCategory(this.salesCategoryToBeDeleted._id).subscribe(
    data=>{
      this.notifyService.showSuccess('Sales Category Delete', 'Success');
    },
    error=>{
      this.notifyService.showError('Not Deleted..', 'Error');
    }
    
  )

}




// === End === 
}
// === End ==