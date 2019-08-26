import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { Project } from "../models/project";
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

  //--------- MAIN URL -----------------------------
  _url: string = "http://localhost:3000/api/projects/";
  _urlGetEmit: string = "http://127.0.0.1:3000/";
  private socket;


  // ---------------------------------------
    constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit)  }




  // Add Project
  addProject( ProjectsData : Project ) {
    return this.http.post<any>(this._url + "create", ProjectsData)
  }
  
    // List Projects
  listProject() {
    return Observable.create((observer) =>{
      this.socket.on('/listProjects', data => {
        observer.next(data);
      })
    });
  }

  
  // Get All Project
  getAllProject() {
    return this.http.get<any>(this._url + "getAll/" )
  }

  // Get Specific Project
  getProject(id) {
    return this.http.get<any>(this._url + "getOne/" + id )
  }
  
  
  
  
  // Update Project
  updateProject(id, data: any) {
    return this.http.put<any>(this._url + "update/" + id, data )
  }    


// Get Specific Project
getGanttProject(id): Promise<any>{
  return this.http.get<any>(this._url + "oneToGantt/" + id)
      .toPromise()
      .catch()
}
  

getLink(): Promise<any> {
    return Promise.resolve([
        {id: 1, source: 1, target: 2, type: "0"}
    ]);
}




    // End
}
