export class oppProject {
    projectName : String;
    clientName: String;
    task : [{
        taskName: String;
        asignedTeam: String;
        taskStatus: String;
        taskDuration: Number;
        taskStartDate: Date;
        taskEndDate: Date;
    }];
    cost: Number;
    priority: Number;
    projectStatus: String;
    projectDuration: Number;
    projectStartDate: Date;
    projectEndDate: Date;
  }