// tslint:disable-next-line: class-name
export class calenderEvent {
    title: string;
    assignedUser: string;
    projectId: any;
    start: Date;
    end: Date;
    color: {
      primary: string;
      secondary: string;
    };
    allDay: boolean;
    draggable: boolean;
    resizable: {
      beforeStart: boolean;
      afterEnd: boolean
    };
  }
