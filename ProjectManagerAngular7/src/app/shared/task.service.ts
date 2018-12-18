import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from "@angular/common/http";
import { Tasksearch } from './tasksearch.model';
import { ParentTask } from './parent-task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  formData : Task;
  list : Task[];
  list1 : Tasksearch[];
  list2 : ParentTask[];
  buttonLabelName : string = 'Add Task';
  isUpdate: boolean = false;
  readonly rootURL ="http://172.18.4.244/api"

  constructor(private http : HttpClient) { }

  postTask(formData : Task){
    var ival = this.rootURL;
    return this.http.post(this.rootURL+'/task',formData);     
   }

   refreshList(){
    this.http.get(this.rootURL+'/task')
    .toPromise().then(res => this.list1= res as Tasksearch[]);
  }

  refreshParentList(){
    this.http.get(this.rootURL+'/parenttask')
    .toPromise().then(res => this.list2= res as ParentTask[]);
  }

  putTask(formData : Task){
    return this.http.put(this.rootURL+'/task/'+formData.Task_ID,formData);     
   }

   deleteTask(id : number){
    return this.http.delete(this.rootURL+'/task/'+id);
   }
}
