import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  formData : Task;
  list : Task[];
  readonly rootURL ="http://localhost:55542/api"

  constructor(private http : HttpClient) { }

  postTask(formData : Task){
    var ival = this.rootURL;
    return this.http.post(this.rootURL+'/task',formData);     
   }

   refreshList(){
    this.http.get(this.rootURL+'/task')
    .toPromise().then(res => this.list = res as Task[]);
  }

  putTask(formData : Task){
    return this.http.put(this.rootURL+'/task/'+formData.Task_ID,formData);     
   }

   deleteTask(id : number){
    return this.http.delete(this.rootURL+'/task/'+id);
   }
}
