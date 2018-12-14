import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/user.model';
import { UserService } from '../../shared/user.service';
import { Task } from '../../shared/task.model';
import { ProjectService } from '../../shared/project.service';
import { Projectsearch } from '../../shared/projectsearch.model';
import { ParentTaskService } from '../../shared/parent-task.service';
import { ParentTask } from '../../shared/parent-task.model';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  userSearch: string;
  setParentCheckBox : boolean = false;
  taskSearch : string;
  projectSearch : string;
  constructor(private parentTaskService: ParentTaskService,private projectService: ProjectService, private service: TaskService, private toastr: ToastrService,private modalService: NgbModal,private userservice: UserService) { }

  ngOnInit() {
    if(this.service.buttonLabelName != 'Update Task')
    {
      this.resetForm();      
    }  
      this.userservice.refreshList();
      this.parentTaskService.refreshList();
      this.projectService.refreshList();  
  }
 

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.setParentCheckBox = false;
      this.service.buttonLabelName = 'Add Task';
      this.service.isUpdate = false;
    this.service.formData = {
        Task_ID : null,
        Parent_ID :null,
        Project_ID :null,
        Task1 :null,
        Start_Date :null,
        End_Date :null,
        Priority :0,
        Status :null,
        ProjectName:null,
        ParentTaskName : null,
        User_ID : null,
        UserName:null
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.Task_ID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form)
  }
  
  updateRecord(form: NgForm) {
    if(this.compareTwoDates())
    {
      this.service.putTask(form.value).subscribe(res => {
        this.toastr.info('Updated successfully', 'Project Manager');
        this.resetForm(form);
        this.service.refreshList();
      });
    }    
}  
  insertRecord(form: NgForm) {
    if(this.setParentCheckBox)
    {
      var parnt: ParentTask;
      parnt = {
        Parent_ID : this.service.formData.Parent_ID,
        Parent_Task : this.service.formData.Task1
      };

      this.parentTaskService.postParentTask(parnt).subscribe(res => {
        this.toastr.success('Inserted successfully', 'Project Manager');
        this.resetForm(form);
        this.service.refreshList();
        this.parentTaskService.refreshList();

      });
    }
    else
    {
      if(this.compareTwoDates())
      {
        this.service.postTask(form.value).subscribe(res => {
          this.toastr.success('Inserted successfully', 'Project Manager');
          this.resetForm(form);
          this.service.refreshList();
        });
      }      
    }    
  }
openLg(content) {
  this.userSearch = '';
  this.modalService.open(content, { size: 'lg' });
}
populateUserName(usr: User) {
  this.service.formData.User_ID = usr.User_ID;
  this.service.formData.UserName = usr.First_Name;
  this.modalService.dismissAll();
}

resetParentControl(form?: NgForm) {
  this.setParentCheckBox = !this.setParentCheckBox;
  if(this.setParentCheckBox)
  {
    this.service.formData.Start_Date = null;
    this.service.formData.End_Date = null;
    this.service.formData.Parent_ID = null;
    this.service.formData.ParentTaskName = null;
    this.service.formData.UserName = null;
    this.service.formData.User_ID = null;
    this.service.formData.Project_ID = null;
    this.service.formData.ProjectName = null;
  }  
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
openTaskModal(taskcontent) {
  this.taskSearch = '';
  this.modalService.open(taskcontent, { size: 'lg' });
}
openProjectModal(projectcontent) {
  this.projectSearch = '';
  this.modalService.open(projectcontent, { size: 'lg' });
}
taskFilterItem(){
  if(this.taskSearch != '')
  {
    this.service.list = Object.assign([], this.service.list).filter(
      item => item.Task1.toLowerCase().indexOf(this.taskSearch.toLowerCase()) > -1
   ) 
  }
  else
  {
    this.service.refreshList();
  }
  
}
projectFilterItem(){
  if(this.projectSearch != '')
  {
    this.projectService.list1 = Object.assign([], this.projectService.list1).filter(
      item => item.ProjectName.toLowerCase().indexOf(this.projectSearch.toLowerCase()) > -1
   ) 
  }
  else
  {
    this.projectService.refreshList();
  }
  
}
populateTaskName(tsk: ParentTask) {
  this.service.formData.Parent_ID = tsk.Parent_ID;
  this.service.formData.ParentTaskName = tsk.Parent_Task;
  this.modalService.dismissAll();
}
compareTwoDates(){
  if(new Date(this.service.formData.Start_Date) > new Date(this.service.formData.End_Date)){
     this.toastr.error('To Date cannot before start date', 'Project Manager');
     return false;
  }
  return true;
}

populateProjectName(pro: Projectsearch) {
  this.service.formData.Project_ID = pro.Project_ID;
  this.service.formData.ProjectName = pro.ProjectName;
  this.modalService.dismissAll();
}
}
