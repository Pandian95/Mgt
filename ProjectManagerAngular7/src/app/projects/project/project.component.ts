
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/user.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  private SaveButtonName: string = "Add";
  date: Date;
  userSearch: string;
  constructor(private service: ProjectService, private toastr: ToastrService,private modalService: NgbModal,private userservice: UserService) { }

  ngOnInit() {
    this.resetForm();
    this.userservice.refreshList();    
  }
  resetForm(form?: NgForm) {
    
    if (form != null)
      form.resetForm();
      
    document.getElementById('lblButtonName').innerHTML = 'Add';
    this.service.setCheckBoxStartEnd = false;
    this.service.formData = {
      Project_ID: null,
      Project1: '',
      Start_Date: null,
      End_Date: null,
      Priority:0,
      Manager:'',
      Manager_ID:null
    }
  }
  resetDateControl(form?: NgForm) {
    this.service.setCheckBoxStartEnd = !this.service.setCheckBoxStartEnd;
    if(this.service.setCheckBoxStartEnd)
    {
      this.service.formData.Start_Date = new Date();
      this.date = new Date();
      this.date.setDate( this.date.getDate() + 1 );
      this.service.formData.End_Date = this.date;
    }
    else
    {
      this.service.formData.Start_Date = null;
      this.service.formData.End_Date = null;
    }
    
  }
  onSubmit(form: NgForm) {
    if(this.compareTwoDates())
    {
      if (form.value.Project_ID == null)
      {
        this.insertRecord(form);
      }        
    else
    {
      this.updateRecord(form);
    }
      
    }    
  }

  compareTwoDates(){
    if(new Date(this.service.formData.Start_Date) > new Date(this.service.formData.End_Date)){
       this.toastr.error('To Date cannot before start date', 'Project Manager');
       return false;
    }
    return true;
 }

  insertRecord(form: NgForm) {
    this.service.postProject(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Project Manager');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
  
  searchUsers(form: NgForm) {
     this.userservice.refreshList();
  }
  openLg(content) {
    this.userSearch = '';
    this.modalService.open(content, { size: 'lg' });
  }
  
  updateRecord(form: NgForm) {
    this.service.putProject(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Project Manager');
      this.resetForm(form);
      this.service.refreshList();
    });
}

populateManagerName(usr: User) {
  this.service.formData.Manager_ID = usr.User_ID;
  this.service.formData.Manager = usr.First_Name;
  this.modalService.dismissAll();
}

filterItem(){
  if(this.userSearch != '')
  {
    this.userservice.list = Object.assign([], this.userservice.list).filter(
      item => item.First_Name.toLowerCase().indexOf(this.userSearch.toLowerCase()) > -1
   ) 
  }
  else
  {
    this.userservice.refreshList();
  }
  
}



}
