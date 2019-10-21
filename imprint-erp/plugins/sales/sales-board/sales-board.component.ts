import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from 'src/app/shared/services/sales.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SalesCategoryService } from 'src/app/shared/services/sales-category.service';
import { CustomaryService } from 'src/app/shared/services/customary.service';
import { UserSalesStagesService } from 'src/app/shared/services/user-sales-stages.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { CalenderEventService } from 'src/app/shared/services/calenderEvent.service';
import { SalesNoteService } from 'src/app/shared/services/sales-note.service';



@Component({
  selector: 'app-sales-board',
  templateUrl: './sales-board.component.html',
  styleUrls: ['./sales-board.component.sass']
})
export class SalesBoardComponent implements OnInit, OnDestroy {

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private salesService: SalesService,
    private notifyService: NotificationService,
    private salesCategoryService: SalesCategoryService,
    private userSalesStageService: UserSalesStagesService,
    private customService: CustomaryService,
    private clientService: ClientService,
    private salesNoteService: SalesNoteService,
    private calenderEventService: CalenderEventService,
    private spinnerServcice: SpinnerService,

  ) { }
// tslint:disable: prefer-const
// tslint:disable: object-literal-shorthand


  // Modal
  @ViewChild('addNewClientModal') public addNewClientModal: ModalDirective;
  @ViewChild('mailToClientModal') public mailToClientModal: ModalDirective;
  @ViewChild('writeNoteModal') public writeNoteModal: ModalDirective;
  @ViewChild('detailNoteModal') public detailNoteModal: ModalDirective;


  // Variables
  @ViewChild('myNewOppForm') myNewOppFormValues;
  @ViewChild('clientInput') clientInput: ElementRef;



  public newOppForm: FormGroup;
  public newStageForm: FormGroup;
  public changeStageNameForm: FormGroup;
  public managerNameForm: FormGroup;
  public phoneForm: FormGroup;
  public altPhoneForm: FormGroup;
  public emailForm: FormGroup;
  public websiteForm: FormGroup;
  public sendMailForm: FormGroup;
  public writeNoteForm: FormGroup;

  @Input() listIndex: number;
  @Input() cardIndex: number;


  // Status
  public FormStatus: boolean;
  public salesCatHoveredOnDrag: any;
  public cardHoveredOnDrag: any;
  public cardBeingDraged: any;

  // --
  public listSectionStatus;
  public reportSectionStatus;
  public managerNameInput;
  public phoneInput;
  public altPhoneInput;
  public emailInput;
  public websiteInput;


  // Binded Variables
  public SalesCategorys: any = [];
  public UserSalesStages: any = [];
  public Opportunitys: any = [];
  public Projects: any = [];
  public Events: any = [];
  public ProjectStatusToNewOpp: string;
  public idStageToBeEdited: any;
  public Tasks: any = [];
  public SalesNotes: any = [];

  public ClientOppened: any = [];
  public mailData: any = [];
  public myInterval: any;
  public kanbanSectionStatus: boolean;
  public noteWriten: any;
  public noteOpened: any;
  public files;



  ngOnInit() {

    window.localStorage.setItem('ActiveNav', 'sales');

    this.kanbanSectionStatus = true;

    this.salesCategoryService.getAllSalesCategories().subscribe(
      data => {
        this.SalesCategorys = data;
        setTimeout(() => {
          this.UpdateSalesCategories();
          // this.getUserSalesStages();
          // this.UpdateUsersSalesStages();
        }, 1000);
      },
      error => { console.log('Cannot get Sales Categories'); }
    ); // get All Sales Category-end

    this.salesService.getAllOppProject().subscribe(
      data => {
        this.Opportunitys = data;
      },
      error => {
        console.log('Cannot get all Opp projects');
      }
    ); // get opp Cat -end

    this.customService.getAllServices().subscribe(
      data => {
        this.Projects = data;
      },
      error => {
        console.log('Cannot get all custom Service');
      }
    ); // get Custom Service Cat -end


    this.calenderEventService.getAllCalenderEvent().subscribe(
      data => {
        this.Events = data;
      },
      error => { console.log('cannot get all calender events on init'); }
    ); // getAllCalenderEvent

    this.salesNoteService.getAllNotes().subscribe(
      noteData => {
        noteData.forEach((note) => {
          this.Opportunitys.forEach((opp) => {
            if ( note.projectId === opp._id ) {
            note = {...note, noteProjectName: `${opp.clientName} - ${opp.projectName}`};
            this.SalesNotes.push(note);
            }
          });
        });
      },
      error => { console.log('cannot list calender Sales Notes on init'); }
    ); // list Sales Note



    // Pass form values
    this.newOppForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      clientName: ['', Validators.required],
      projectManager: [''],
      task: [{
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

    this.changeStageNameForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.newStageForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.managerNameForm = this.formBuilder.group({
      managerName: ['', Validators.required]
    });

    this.phoneForm = this.formBuilder.group({
      primaryTelNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.altPhoneForm = this.formBuilder.group({
      secondaryTelNumber: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.websiteForm = this.formBuilder.group({
      website: ['', Validators.required]
    });

    this.sendMailForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.writeNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      createdAt: [null],
      createdBy: [localStorage.getItem('loggedUserName')],

    });

    this.salesCategoryService.listSalesCategory().subscribe(
      data => {
        this.SalesCategorys = data;
      },
      error => {
        console.log('Cannot list Sales Categories');
      }
    ); // list sales Cat -end


    this.salesService.listOppProject().subscribe(
      data => {
        this.Opportunitys = data;
      },
      error => {
        console.log('Cannot list Opp projects');
      }
    ); // list opp Cat -end

    this.customService.listServices().subscribe(
      data => {
        this.Projects = data;
      },
      error => {
        console.log('Cannot list custom Service');
      }
    ); // list Custom Service Cat -end

    this.calenderEventService.listCalenderEvent().subscribe(
      data => {
        this.Events = data;
      },
      error => { console.log('cannot list calender events on init'); }
    ); // listCalenderEvent

    this.salesNoteService.listNotes().subscribe(
      noteData => {
        this.SalesNotes = [];
        noteData.forEach((note) => {
          this.Opportunitys.forEach((opp) => {
            if ( note.projectId === opp._id ) {
            note = {...note, noteProjectName: `${opp.clientName} - ${opp.projectName}`};
            this.SalesNotes.push(note);
            }
          });
        });
      },
      error => { console.log('cannot list calender Sales Notes on init'); }
    ); // list Sales Note



    this.myInterval = setInterval(() => {
      this.eventReminder();
    }, 3600000); // On Hour


  }// ngOnInit -end





  // conveniently get the values from the form fields
  get formNewOpp() { return this.newOppForm.controls; }
  get formChangeStageName() { return this.changeStageNameForm.controls; }
  get formNewStage() { return this.newStageForm.controls; }
  get formManagerName() { return this.managerNameForm.controls; }
  get formPhone() { return this.phoneForm.controls; }
  get formAltPhone() { return this.altPhoneForm.controls; }
  get formEmail() { return this.emailForm.controls; }
  get formWebsite() { return this.websiteForm.controls; }
  get formSendMail() { return this.sendMailForm.controls; }
  get formWriteNote() { return this.writeNoteForm.controls; }



  setClickedStage(clickedStage) {
    this.ProjectStatusToNewOpp = clickedStage;
  }

  stageToBeEdited(id) {
    this.idStageToBeEdited = id;
  }


  getUserSalesStages() {
    this.userSalesStageService.getUserStages(localStorage.getItem('loggedUserID')).subscribe(
      data => {

        if (data.length === 0) {

          const stage1 = { name: 'new leads', totalLeads: null, totalRevenue: null, userId: localStorage.getItem('loggedUserID') };
          const stage2 = { name: 'prospects', totalLeads: null, totalRevenue: null, userId: localStorage.getItem('loggedUserID') };
          const stage3 = { name: 'qualified leads', totalLeads: null, totalRevenue: null, userId: localStorage.getItem('loggedUserID') };
          const stage4 = { name: 'customers', totalLeads: null, totalRevenue: null, userId: localStorage.getItem('loggedUserID') };

          this.userSalesStageService.createStage(stage1).subscribe(
            () => {
              this.userSalesStageService.createStage(stage2).subscribe(
                () => {

                  this.userSalesStageService.createStage(stage3).subscribe(
                    () => {

                      this.userSalesStageService.createStage(stage4).subscribe(
                        () => {

                          this.notifyService.showInfo('Defaults stages has been created.', 'Info');

                          this.getUserSalesStages();

                        },
                        error => { console.log('Errror'); }
                      );
                    },
                    error => { console.log('Errror'); }
                  );

                },
                error => { console.log('Errror'); }
              );
            },
            error => { console.log('Errror'); }
          );

        } else if (data.length !== 0) {
          this.UserSalesStages = data;
        }

      },
      error => { console.log('Cannot get user sales stages'); }

    );
  }


  UpdateUsersSalesStages() {

    this.userSalesStageService.getAllStages().subscribe(
      data => {
        data.forEach(stage => {

          let OppInThisCategory = this.Opportunitys.filter((opp) => {
            return opp.projectStatus === stage.name ? true : false;
          }).map((e) =>  e);

          let dataToBeUpdated = {
            totalLeads: OppInThisCategory.length,
            totalRevenue: OppInThisCategory.reduce((previous, current) => previous + current.cost, 0)
          };

          this.userSalesStageService.updateStage(stage._id, dataToBeUpdated).subscribe(
            () => {
              this.getUserSalesStages();
            }
          );


        });
      }, error => { }
    );


  }


  UpdateSalesCategories() {

    this.salesCategoryService.getAllSalesCategories().subscribe(
      data => {

        data.forEach((category) => {

          let OppInThisCategory = this.Opportunitys.filter((opp) => {
            return opp.projectStatus === category.name ? true : false;
          }).map((e) => e );

          let dataToBeUpdated = {
            totalLeads: OppInThisCategory.length,
            totalRevenue: OppInThisCategory.reduce( (previous, current) => previous + current.cost, 0)
          };

          this.salesCategoryService.updateSaleCategory(category._id, dataToBeUpdated).subscribe(
            salesCatData => {
              this.SalesCategorys = salesCatData;
            }
          );

        });

      }
    );

  }



  submitNewOppForm() {

    // Adding abjects to task array
    this.Projects.forEach((proj) => {
      return proj.serviceName === this.newOppForm.value.projectName ?

        this.Tasks = proj.task.filter((a) => {
          a.assignedUser = '';
          a.taskStatus = 'unChecked';
          a.taskDuration = null;
          a.taskStartDate = null;
          a.taskEndDate = null;
          return true;
        }).map(a => a ) :

        '';

    });

    let structuredData = {
      projectName: this.newOppForm.value.projectName,
      clientName: this.newOppForm.value.clientName,
      projectManager: '',
      task: this.Tasks,
      cost: null,
      priority: 1,
      projectStatus: this.ProjectStatusToNewOpp,
      projectDuration: null,
      projectStartDate: null,
      projectEndDate: null
    };

    this.salesService.addOppProject(structuredData).subscribe(
      data => {
        this.createNewClient(data);
        this.notifyService.showSuccess(`Client ${data.clientName} has been added`, 'Success');
        this.FormStatus = !this.FormStatus;
        this.clientInput.nativeElement.value = '';

        setTimeout(() => {
          this.UpdateSalesCategories();
          // this.UpdateUsersSalesStages();
        }, 1000);

      },
      error => { this.notifyService.showError(error, 'Failed...'); }
    );
  }





  createNewClient(client) {
    let newClient = {
      companyName: client.clientName,
      managerName: '',
      primaryTelNumber: null,
      secondaryTelNumber: null,
      email: '',
      website: '',
      twitter: '',
      facebook: '',
      instagram: ''
    };

    this.clientService.createClient(newClient).subscribe(

      data => {
        this.notifyService.showSuccess('New Cilent Adedd', 'Success');
      },
      error => {

        this.notifyService.showInfo('New Deal to existing client', 'Info');
      }

    );

  }






  seeClient(client) {

    this.clientService.getOneByName(client).subscribe(
      data => {
        this.ClientOppened = data;
      }
    );
  }


  saveManagerName(id) {
    this.clientService.updateClient(this.ClientOppened._id, this.managerNameForm.value).subscribe(
      data => {
        this.ClientOppened = data;
        this.notifyService.showSuccess('Changes Saved', 'Success');
      },
      error => {
        this.notifyService.showError('Not Saved', 'Error');
      }
    );
  }

  savePhoneNumber() {
    this.clientService.updateClient(this.ClientOppened._id, this.phoneForm.value).subscribe(
      data => {
        this.ClientOppened = data;
        this.notifyService.showSuccess('Changes Saved', 'Success');
      },
      error => {
        this.notifyService.showError('Not Saved', 'Error');
      }
    );
  }


  saveAlternativePhoneNumber() {
    this.clientService.updateClient(this.ClientOppened._id, this.altPhoneForm.value).subscribe(
      data => {
        this.ClientOppened = data;
        this.notifyService.showSuccess('Changes Saved', 'Success');
      },
      error => {
        this.notifyService.showError('Not Saved', 'Error');
      }
    );
  }

  saveEmail() {
    this.clientService.updateClient(this.ClientOppened._id, this.emailForm.value).subscribe(
      data => {
        this.ClientOppened = data;
        this.notifyService.showSuccess('Changes Saved', 'Success');
      },
      error => {
        this.notifyService.showError('Not Saved', 'Error');
      }
    );
  }

  saveWebsite() {
    this.clientService.updateClient(this.ClientOppened._id, this.websiteForm.value).subscribe(
      data => {
        this.ClientOppened = data;
        this.notifyService.showSuccess('Changes Saved', 'Success');
      },
      error => {
        this.notifyService.showError('Not Saved', 'Error');
      }
    );
  }




  mailFunction(client) {

    this.clientService.getOneByName(client).subscribe(
      clientData => {
        if (clientData.email === '') {
          // this.mailToClientModal.hide();
          this.notifyService.showWarning('Client has no mail', 'Warning!');
          setTimeout(() => {
            this.notifyService.showInfo('You might want to assign an email', 'Info...');
          }, 3000);
        } else {

          // let to = clientData.email;
          // window.location.href = "mailto:?to="+to;
          this.mailToClientModal.show();
          this.mailData = {
            sender: localStorage.getItem('loggedUserEmail'),
            reciever: clientData.email,
            client: clientData.companyName
          };
        }
      }
    );
  }


  sendMailToClient() {
    this.spinnerServcice.spinStart();
    let dataToBeSent = {
      sender: this.mailData.sender,
      reciever: this.mailData.reciever,
      subject: this.sendMailForm.value.subject,
      message: this.sendMailForm.value.message
    };

    this.clientService.sendMail(dataToBeSent).subscribe(
      data => {
        this.spinnerServcice.spinStop();
        this.notifyService.showSuccess('Mail Sent', 'Success');
        this.mailToClientModal.hide();
      },
      error => {
        this.spinnerServcice.spinStop();
        this.notifyService.showError('Mail not sent', 'Error');
      }
    );

  }





  spinToggle() {

    this.spinnerServcice.spinStart();

    setTimeout(() => {
      this.spinnerServcice.spinStop();
    }, 3000);

  }



  toCalender() {
    this.router.navigate(['/ngCalender']);
  }

  toScheduleActivity(id) {
    localStorage.setItem('eventProjectId', id);
    this.router.navigate(['/ngCalender']);
  }



  submitEditedStage() {

    this.userSalesStageService.getOneStage(this.idStageToBeEdited).subscribe(
      prevStage => {

        let previouseName = prevStage.name;

        let dataToSend = { name: this.changeStageNameForm.value.name.toLowerCase() };
        this.userSalesStageService.updateStage(this.idStageToBeEdited, dataToSend).subscribe(

          data => {

            this.salesService.getAllOppProject().subscribe(
              oppData => {

                oppData.forEach(opp => {
                  if (opp.projectStatus === previouseName) {

                    this.salesService.updateOppProject(opp._id, { projectStatus: this.changeStageNameForm.value.name.toLowerCase() })
                    .subscribe(
                      updatedData => { },
                      error => { console.log('Error'); }
                    );
                  }
                });

                this.notifyService.showSuccess('Stage Edited', 'Success'); this.getUserSalesStages();

              },
              error => { this.notifyService.showError('Not Edited', 'Error'); }
            );

          }

        );


      }
    );
  }// submitEditedStage -end




  submitNewStageForm() {

    let dataToBeSent = {
      name: this.newStageForm.value.name,
      totalLeads: null,
      totalRevenue: null,
      userId: localStorage.getItem('loggedUserID')
    };

    this.userSalesStageService.createStage(dataToBeSent).subscribe(
      data => { this.notifyService.showSuccess('Stage Added', 'Success'); this.getUserSalesStages(); },
      error => { this.notifyService.showError('Stage Not Added', 'Error'); }
    );

  }





  deleteUserSalesStage(id) {
    this.userSalesStageService.deleteStage(id).subscribe(
      data => { this.notifyService.showSuccess('Stage Deleted', 'Success'); this.getUserSalesStages(); },
      error => { this.notifyService.showError('NOT Deleted', 'Failed'); }
    );

  }




  clearNewClientForm() {
    this.clientInput.nativeElement.value = '';
    this.FormStatus = !this.FormStatus;
  }


  toSalesEdit(id) {
    this.router.navigate(['sales/sales_edit']);
    window.localStorage.setItem('salesEditItemId', id);

  }

  // Drag and Drop Functions
  highlightcategory(e) {
    this.salesCatHoveredOnDrag = e.target.id;
  }


  allowDrop(e) {
    e.preventDefault();
  }


  drag(e) {
    e.dataTransfer.setData('text', e.target.id);
    this.cardBeingDraged = e.target.id;
  }


  dragenter(e) {
    this.cardHoveredOnDrag = e.target.id;
  }


  dragleave(e) {
    // this.cardHoveredOnDrag = null;
  }


  drop(e) {
    e.preventDefault();
    this.cardHoveredOnDrag = null;
    this.salesCatHoveredOnDrag = null;
    let CardId = e.dataTransfer.getData('text');
    let TargetId = e.target.id;

    this.UserSalesStages.forEach((stage) => {
      return stage._id === TargetId ? this.switchStage(CardId, stage) : '';
    });

    this.SalesCategorys.forEach((stage) => {
      return stage._id === TargetId ? this.switchStage(CardId, stage) : '';
    });

  }



  switchStage(CardId, data) {

    this.Opportunitys.forEach(opp => {
      if (opp._id === CardId) {

        if (opp.projectStatus !== data.name) {

          let updateData = {
            projectStatus: data.name
          };

          // Update
          this.salesService.updateOppProject(CardId, updateData).subscribe(
            updatedOppdata => {

              this.cardBeingDraged = null;
              this.notifyService.showSuccess('Card Moved', 'Success');
              setTimeout(() => {
                this.UpdateSalesCategories();
                // this.UpdateUsersSalesStages();
              }, 1000);

            },
            error => {
              this.cardBeingDraged = null;
              this.notifyService.showError('Card did not move', 'Error !');
            }
          );

        }

      }

    });

  }





  async eventReminder() {

    this.Events.forEach((eventElement, index) => {



      setTimeout(() => {

        this.Opportunitys.forEach((oppElement) => {

          if (eventElement.projectId === oppElement._id) {

            let now = new Date();
            let then = new Date(eventElement.start);

            let diffInMS = (then.getTime() - now.getTime());

            let diffInHours = Math.ceil(diffInMS / (1000 * 3600));

            if (diffInHours === 1) {
              this.notifyService.showWarning(eventElement.title + ' : ' + oppElement.clientName, 'This Hour Event');
            }

            if (diffInHours === 2) {
              this.notifyService.showWarning(eventElement.title + ' : ' + oppElement.clientName, 'Next Hour Event');
            }

            if (13 > diffInHours && diffInHours > 2) {
              this.notifyService.showInfo(eventElement.title + ' : ' + oppElement.clientName, 'Up coming Event');
            }
          }

        });

      }, 6000 * index);

    });

  }


  writeAnote(id, name) {
    this.noteWriten = {
      id : id,
      name: name
    };
    this.writeNoteModal.show();

  }




  submitNote() {
    let dataToBeSent = {
      title: this.writeNoteForm.value.title,
      content: this.writeNoteForm.value.content,
      projectId: this.noteWriten.id,
      createdAt: new Date(),
      createdBy: this.writeNoteForm.value.createdBy,
    };

    this.salesNoteService.createNote(dataToBeSent).subscribe(
      data => {
        this.notifyService.showSuccess('Note Saved', 'Success');
        this.writeNoteModal.hide();
      },
      error => {
        this.notifyService.showError('Did Not Save', 'Error');
      }
    );
  }


  openNote(id) {
    this.salesNoteService.getOneNote(id).subscribe(
      noteData => {
        this.salesService.getOppProject(noteData.projectId).subscribe(
          noteProject => {
            this.noteOpened = noteData;
            this.noteOpened = {...this.noteOpened, noteProjectName: `${noteProject.clientName} - ${noteProject.projectName}`};
            this.detailNoteModal.show();
          },
          error => {
            this.notifyService.showError('Could Not get note project', 'Error');
            console.log(error);
          }
        );
      },
      error => {
        this.notifyService.showError('Could Not Open', 'Error');
        console.log(error);
      }
    );
  }

  deleteNote(id) {
    this.salesNoteService.deleteNote(id).subscribe(
      data => {
        this.detailNoteModal.hide();
        this.notifyService.showSuccess('Note Deleted', 'Success');
      },
      error => {
        this.notifyService.showError('No changed', 'error');
      }
    );

  }

  ngOnDestroy() {
    clearInterval(this.myInterval);
  }





}// Class -end
