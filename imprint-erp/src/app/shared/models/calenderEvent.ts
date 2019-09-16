export class calenderEvent {
    title: String;
    assignedUser: String;
    projectId: any;
    start: Date;
    end: Date;
    color: {
      primary: String;
      secondary: String;
    };
    allDay: Boolean;
    draggable: Boolean;
    resizable: {
      beforeStart: Boolean;
      afterEnd: Boolean
    }
  }
  