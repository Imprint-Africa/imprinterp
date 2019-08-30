import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Project } from "../models/project";
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProjectsService {


  _url: string = "http://localhost:3000/api/projects/";
  _urlGetEmit: string = "http://127.0.0.1:3000/";

  private socket;



  header = new HttpHeaders().set(
    'Authorization', `Bearer ${window.localStorage.getItem("loggedUserToken")}`
  );



    constructor( private http: HttpClient ) { this.socket = io(this._urlGetEmit)  }



  addProject( ProjectsData : Project ) {
    return this.http.post<any>(this._url + "create", ProjectsData, {headers : this.header})
  }
  

  listProject() {
    return Observable.create((observer) =>{
      this.socket.on('/listProjects', data => {
        observer.next(data);
      })
    });
  }

  


  getAllProject() {
    return this.http.get<any>(this._url + "getAll/",{headers : this.header})
  }


  getProject(id) {
    return this.http.get<any>(this._url + "getOne/" + id,{headers : this.header} )
  }
  
  

  updateProject(id, data: any) {
    return this.http.put<any>(this._url + "update/" + id, data,{headers : this.header})
  }    



getGanttProject(id): Promise<any>{
  return this.http.get<any>(this._url + "oneToGantt/" + id, {headers : this.header})
      .toPromise()
      .catch()
}
  
  // Structure Gantt Chart data
  getLink(): Promise<any> {
      return Promise.resolve([
          {id: 1, source: 1, target: 2, type: "0"}
      ]);
  }




    // End
}
