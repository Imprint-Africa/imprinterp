export class calenderEvent {
    title: String;
    assignedUser: String;
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
  