import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { CalenderEventService } from 'src/app/shared/services/calenderEvent.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';

  
  
  @Component({
    selector: 'ngCalenderComponent',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./ngCalender.component.sass'],
    templateUrl: './ngCalender.component.html'
  })
  export class ngCalenderComponent implements OnInit {

    constructor(private modal: NgbModal,
      private calenderEventService: CalenderEventService,
      private userServices: UserService,
      private notifyService: NotificationService
    ) {}


    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    //status
    public allEventsSectionStatus;
    public editEventsSectionStatus;


    public view: CalendarView = CalendarView.Month;
    public CalendarView = CalendarView;
    public viewDate: Date = new Date();
    public refresh: Subject<any> = new Subject();
  
    public events: any = [];
    public Users: any = [];
  
    public activeDayIsOpen: boolean;
    public calenderSectionStatus: boolean;

    public myInterval;
  



    ngOnInit(){

      this.activeDayIsOpen = false;
      this.calenderSectionStatus = true;

      this.calenderEventService.getAllCalenderEvent().subscribe(
        data=>{
          this.events = data.filter(e=>{
            e.start = new Date(e.start);
            e.end = new Date(e.end);

            return true
          }).map(e=>{return e});


      },
        error=>{console.log("cannot get all calender events on init")}
      )

      this.userServices.getAllUsers().subscribe(
        data=>{
            this.Users = data;
        },
        error=>{
          console.log('Error getting Users')
        }
      )


      this.calenderEventService.listCalenderEvent().subscribe(
        data=>{
          this.events = data.filter(e=>{
            e.start = new Date(e.start);
            e.end = new Date(e.end);

            return true
          }).map(e=>{return e});  
        },
        error=>{console.log("cannot get all calender events on init")}
      )

      this.userServices.listUsers().subscribe(
        data=>{
            this.Users = data;
        },
        error=>{
          console.log('Error listing Users')
        }
      )

      this.myInterval = setInterval(()=>{
        this.removePastEvent();
      }, 3600000) // On Hour 3600000
      

    }// ngOnInit


  
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }
  



    eventTimesChanged({
        event,
        newStart,
        newEnd
        }: CalendarEventTimesChangedEvent): void {
              this.events = this.events.map(iEvent => {
                if (iEvent === event) {
                  let updatedEvent ={
                    ...event,
                    start: newStart,
                    end: newEnd
                  };
                  this.saveEditEvent(updatedEvent)

                  return updatedEvent;
                }
                
                return iEvent;
              });
              }


    addEvent(): void {
      this.events = [
        ...this.events,
        {
          title: 'New event',
          assignedUser: localStorage.getItem('loggedUserName'),
          projectId: null,
          start: startOfDay(new Date()),
          end: endOfDay(new Date()),
          color: {
            primary: '#28a745',
            secondary: '#ffc107'
          },
          allDay: false,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        }
      ];
    }



    submitNewEvent(){
      let eventAssignedToProject;

      if(localStorage.getItem('eventProjectId')){
        eventAssignedToProject = localStorage.getItem('eventProjectId')
      }
      if(!localStorage.getItem('eventProjectId')){
        eventAssignedToProject = null
      }
       

      this.events.forEach((e, idx, array)=>{
        if (idx === array.length - 1){ 
          let i = {
            title: e.title,
            assignedUser: e.assignedUser,
            projectId: eventAssignedToProject,
            start: e.start,
            end: e.end,
            color: e.color,
            allDay: e.allDay,
            draggable: e.draggable,
            resizable:  e.resizable
            }      
            this.saveToDatabase(i);
        }
      });
    }

    saveToDatabase(dataToSend){

      this.calenderEventService.addCalenderEvent(dataToSend).subscribe(
        data=>{ this.notifyService.showSuccess("New Event Added", 'Success'); },
        error=>{ this.notifyService.showError("Not Added", "Error"); }
      )
    }// SaveToDatabase



    saveEditEvent(e){
   
      this.calenderEventService.updateCalenderEvent(e._id, e).subscribe(
        data=>{ this.notifyService.showSuccess("Event Edited", 'Success'); },
        error=>{ this.notifyService.showError("Not edited", "Error"); }
      )
    }

    cancelEvent(eventToCancel) {
      this.events = this.events.filter(event => event !== eventToCancel);
    }
  
    deleteEvent(eventToDelete) {
      this.events = this.events.filter(event => event !== eventToDelete);
      this.calenderEventService.deleteCalenderEvent(eventToDelete._id).subscribe(
        data=>{ this.notifyService.showSuccess("Event Deleted", 'Success'); },
        error=>{ this.notifyService.showError("Not Deleted", "Error"); }
      )
    }
  
    setView(view: CalendarView) {
      this.view = view;
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }


    removePastEvent(){
  
      this.events.forEach(eventElement => {
        let now = new Date;
        let then = new Date(eventElement.end)

        let diffInMS = (now.getTime() - then.getTime())

        let diffInHours = Math.ceil(diffInMS / (1000 * 3600))

        if (diffInHours > 24){
          this.deleteEvent(eventElement)
        }

      });

    }


    ngOnDestroy(){
      localStorage.removeItem('eventProjectId');
      clearInterval(this.myInterval);
    }


  }// End Of Class
  