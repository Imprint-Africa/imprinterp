import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SalesService } from 'src/app/shared/services/sales.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SalesCategoryService } from 'src/app/shared/services/sales-category.service';
import { CustomaryService } from 'src/app/shared/services/customary.service';
import { UserSalesStagesService } from 'src/app/shared/services/user-sales-stages.service';


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
    private userSalesStageService: UserSalesStagesService,
    private customService: CustomaryService
  ) { }



// Modal
@ViewChild('addNewClientModal') public addNewClientModal: ModalDirective;


// Variables
  @ViewChild('myNewClientForm') myNewClientFormValues;
  @ViewChild('clientInput') clientInput: ElementRef
  public newClientForm: FormGroup;
  public newStageForm: FormGroup;
  public changeStageNameForm: FormGroup;


  @Input() listIndex: number;
  @Input() cardIndex: number;


// Status
public FormStatus: boolean;
public salesCatHoveredOnDrag: any;
public cardHoveredOnDrag: any;
public cardBeingDraged: any;






// Binded Variables
public SalesCategorys: any = [];
public UserSalesStages: any = [];
public Opportunitys: any = [];
public Projects: any = [];
public ProjectStatusToNewClient: string;
public idStageToBeEdited: any;
public Tasks: any = [];

public myInterval: any;





  ngOnInit() {

    window.localStorage.setItem('ActiveNav', 'sales');

    this.salesCategoryService.getAllSalesCategories().subscribe(
      data=>{
          this.SalesCategorys = data;
          setTimeout(() => {
            this.UpdateSalesCategories();
            this.getUserSalesStages();
            this.UpdateUsersSalesStages();
          }, 1000);
        },
      error=>{console.log('Cannot get Sales Categories')}
    )// get All Sales Category -end

    

    this.salesService.getAllOppProject().subscribe(
      data=>{
        this.Opportunitys = data;
      },
      error=>{
        console.log('Cannot get all Opp projects')
      }
    )// list opp Cat -end

    this.customService.getAllServices().subscribe(
      data=>{
          this.Projects = data;
      },
      error=>{
        console.log('Cannot get all custom Service')
      }
    )// list Custom Service Cat -end




    // Pass form values
    this.newClientForm=this.formBuilder.group({
      projectName: ['', Validators.required],
      clientName: ['', Validators.required],
      projectManager: [''],
      task : [{
          taskName: [''],
          assignedTeam: [''],
          assignedUser: [''],
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

    this.changeStageNameForm=this.formBuilder.group({
      name: ['', Validators.required]
    })

    this.newStageForm=this.formBuilder.group({
      name: ['', Validators.required]
    })


    this.salesCategoryService.listSalesCategory().subscribe(
      data=>{
          this.SalesCategorys = data;
        },
      error=>{
          console.log('Cannot list Sales Categories')
        }
    )// list sales Cat -end


    this.salesService.listOppProject().subscribe(
      data=>{
        this.Opportunitys = data;
      },
      error=>{
        console.log('Cannot list Opp projects')
      }
    )// list opp Cat -end

    this.customService.listServices().subscribe(
      data=>{
          this.Projects = data;
      },
      error=>{
        console.log('Cannot list custom Service')
      }
    )// list Custom Service Cat -end


  }// ngOnInit -end





 // conveniently get the values from the form fields
 get formNewClient() {return this.newClientForm.controls;}
 get formChangeStageName() {return this.changeStageNameForm.controls;}
 get formNewStage() {return this.newStageForm.controls;}




 setClickedStage(clickedStage){
  this.ProjectStatusToNewClient = clickedStage
 }

 stageToBeEdited(id){
  this.idStageToBeEdited = id;
 }


getUserSalesStages(){
  this.userSalesStageService.getUserStages(localStorage.getItem('loggedUserID')).subscribe(
    data=>{

      if( data.length === 0 ){        

              let stage1 = { name: 'new leads', totalLeads: null, totalRevenue: null, userId: localStorage.getItem('loggedUserID') };
              let stage2 = { name: 'proposed leads', totalLeads: null, totalRevenue: null, userId: localStorage.getItem('loggedUserID') };
              let stage3 = { name: 'qualified leads', totalLeads: null, totalRevenue: null, userId: localStorage.getItem('loggedUserID') }           

              this.userSalesStageService.createStage(stage1).subscribe(
                data=>{
                  this.userSalesStageService.createStage(stage2).subscribe(
                    data=>{

                      this.userSalesStageService.createStage(stage3).subscribe(
                        data=>{

                          this.notifyService.showInfo('Defaults stages has been created.', 'Info');
                          
                          this.getUserSalesStages();

                        },
                        error=>{ console.log('Errror')}
                      )
                          
                    },
                    error=>{ console.log('Errror')}
                  )
                },
                error=>{ console.log('Errror')}
              )
  
      }
      else if(data.length != 0){
        this.UserSalesStages = data;
      }

    },
    error=>{ console.log('Cannot get user sales stages');}

  )
}


  UpdateUsersSalesStages(){

    this.userSalesStageService.getAllStages().subscribe(
      data=>{
        data.forEach(stage => {
          
          let OppInThisCategory = this.Opportunitys.filter((opp)=>{
            return opp.projectStatus === stage.name ? true : false
          }).map((e)=>{return e});
      
          let dataToBeUpdated = {
            totalLeads: OppInThisCategory.length,
            totalRevenue: OppInThisCategory.reduce(function(previous, current){ return previous + current.cost}, 0)
          }

          this.userSalesStageService.updateStage(stage._id, dataToBeUpdated).subscribe(
            data=>{
              this.getUserSalesStages();
            }
          )


        });
      }, error=>{}
    )


  }


 UpdateSalesCategories(){

   this.salesCategoryService.getAllSalesCategories().subscribe(
     data=>{

      data.forEach((category)=>{

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
   )

 }



submitNewClientForm(){

    // Adding abjects to task array
    this.Projects.forEach((proj)=>{
      return proj.serviceName === this.newClientForm.value.projectName ?

      this.Tasks = proj.task.filter((a)=>{
          a.assignedUser = '';
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
      projectManager: '',
      task : this.Tasks,
      cost: null,
      priority: 1,
      projectStatus: this.ProjectStatusToNewClient,
      projectDuration: null,
      projectStartDate: null,
      projectEndDate: null
    }

    this.salesService.addOppProject(structuredData).subscribe(
      data => { 
        this.notifyService.showSuccess(`Client ${data.clientName} has been added`, "Success");
        this.FormStatus = !this.FormStatus;
        this.clientInput.nativeElement.value = '';

        setTimeout(() => {
          this.UpdateSalesCategories();
          this.UpdateUsersSalesStages();
        }, 1000);

      },
      error => { this.notifyService.showError(error, "Failed...")}
    )
  }






  submitEditedStage(){

    this.userSalesStageService.getOneStage(this.idStageToBeEdited).subscribe(
      prevStage=>{

        let previouseName = prevStage.name;

        let dataToSend = { name : this.changeStageNameForm.value.name.toLowerCase()}
        this.userSalesStageService.updateStage(this.idStageToBeEdited, dataToSend).subscribe(
    
          data=>{ 
            
              this.salesService.getAllOppProject().subscribe(
              oppData=>{

                   oppData.forEach(opp => {
                          if(opp.projectStatus === previouseName){
        
                            this.salesService.updateOppProject(opp._id, {projectStatus: this.changeStageNameForm.value.name.toLowerCase()}).subscribe(
                              data=>{},
                              error=>{ console.log('Error')}
                              )
                            }
                    })
                  
                  this.notifyService.showSuccess('Stage Edited', 'Success'); this.getUserSalesStages();
    
              },
              error=>{this.notifyService.showError('Not Edited', 'Error')}
            )
          
          }
    
        )


      }
    )
  }// submitEditedStage -end




  submitNewStageForm(){

    let dataToBeSent = {
      name : this.newStageForm.value.name,
      totalLeads : null,
      totalRevenue : null,
      userId: localStorage.getItem('loggedUserID')
    }

    this.userSalesStageService.createStage(dataToBeSent).subscribe(
      data=>{this.notifyService.showSuccess('Stage Added', 'Success'); this.getUserSalesStages();},
      error=>{ this.notifyService.showError('Stage Not Added', 'Error') }
    )

  }






  clearNewClientForm(){
    this.clientInput.nativeElement.value = ''; 
    this.FormStatus = !this.FormStatus;
  }


  toSalesEdit(id){
    this.router.navigate(['sales/sales_edit']);
    window.localStorage.setItem('salesEditItemId', id)
    
  }

  // Drag and Drop Functions
highlightcategory(e){
this.salesCatHoveredOnDrag = e.target.id;
}


allowDrop(e){
  e.preventDefault();
}


drag(e){
  e.dataTransfer.setData('text', e.target.id);
  this.cardBeingDraged = e.target.id;
}


dragenter(e){
  this.cardHoveredOnDrag = e.target.id;
}


dragleave(e){
  // this.cardHoveredOnDrag = null;
}


drop(e){
  e.preventDefault();
  this.cardHoveredOnDrag = null;
  this.salesCatHoveredOnDrag = null;
  let CardId = e.dataTransfer.getData('text');
  let TargetId = e.target.id

  // Get Target Info
  this.userSalesStageService.getOneStage(TargetId).subscribe(
    data=>{
  
      this.Opportunitys.forEach(opp=>{
        if(opp._id === CardId){
            
          if(opp.projectStatus != data.name){
           
            let updateData = {
                  projectStatus: data.name
                }
          
                // Update
                this.salesService.updateOppProject(CardId, updateData).subscribe(
                  data=>{

                    this.cardBeingDraged = null;
                    this.notifyService.showSuccess("Card Moved", "Success")
                    setTimeout(() => {
                      this.UpdateSalesCategories();
                      this.UpdateUsersSalesStages();
                    }, 1000);
              
                  },
                  error=>{
                    this.cardBeingDraged = null;
                    this.notifyService.showError("Card did not move", "Error !")
                  }
                )
                  
          }

        }

      })



      // ---
    },
    error=>{
      console.log('Droped on the Wrong Place')
    }
  )
}




ngOnDestroy(){
  clearInterval(this.myInterval);
}





}// Class -end
