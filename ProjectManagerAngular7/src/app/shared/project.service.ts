import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  formData : Project;
  list : Project[];
  readonly rootURL ="http://localhost:55542/api"

  constructor(private http : HttpClient) { }

  postProject(formData : Project){
    var ival = this.rootURL;
    return this.http.post(this.rootURL+'/project',formData);     
   }

   refreshList(){
    this.http.get(this.rootURL+'/project')
    .toPromise().then(res => this.list = res as Project[]);
  }

  putProject(formData : Project){
    return this.http.put(this.rootURL+'/project/'+formData.Project_ID,formData);     
   }

   deleteProject(id : number){
    return this.http.delete(this.rootURL+'/project/'+id);
   }
}
