import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData : User;
  list : User[];
  readonly rootURL ="http://172.18.4.244/api"

  constructor(private http : HttpClient) { }

  postUser(formData : User){
    var ival = this.rootURL;
    return this.http.post(this.rootURL+'/user',formData);     
   }

   refreshList(){
    this.http.get(this.rootURL+'/user')
    .toPromise().then(res => this.list = res as User[]);
  }

  putUser(formData : User){
    return this.http.put(this.rootURL+'/user/'+formData.User_ID,formData);     
   }

   deleteUser(id : number){
    return this.http.delete(this.rootURL+'/user/'+id);
   }
}
