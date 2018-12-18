import { Injectable } from '@angular/core';
import { ParentTask } from './parent-task.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParentTaskService {
  formData : ParentTask;
  list : ParentTask[];
  readonly rootURL ="http://172.18.4.244/api"
  constructor(private http : HttpClient) { }

  postParentTask(formData : ParentTask){
    var ival = this.rootURL;
    return this.http.post(this.rootURL+'/parenttask',formData);     
   }
   refreshList(){
    this.http.get(this.rootURL+'/parenttask')
    .toPromise().then(res => this.list = res as ParentTask[]);
  }
}
