import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { Projectsearch } from './projectsearch.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  formData : Project;
  list : Project[];
  list1 : Projectsearch[];
  readonly rootURL ="http://localhost:55542/api";
  setCheckBoxStartEnd = false;
  
  constructor(private http : HttpClient) { }

  postProject(formData : Project){
    var ival = this.rootURL;
    return this.http.post(this.rootURL+'/project',formData);     
   }

   refreshList(){
    this.http.get(this.rootURL+'/project')
    .toPromise().then(res => this.list1 = res as Projectsearch[]);
  }

  putProject(formData : Project){
    return this.http.put(this.rootURL+'/project/'+formData.Project_ID,formData);     
   }

   deleteProject(id : number){
    return this.http.delete(this.rootURL+'/project/'+id);
   }
}
