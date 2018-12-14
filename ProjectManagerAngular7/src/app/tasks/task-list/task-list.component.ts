import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../shared/task.service';
import { Tasksearch } from 'src/app/shared/tasksearch.model';
import { ProjectService } from '../../shared/project.service';
import { Projectsearch } from '../../shared/projectsearch.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Task } from '../../shared/task.model';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  ProjectSearchTask :string;
  projectSearch : string;

  constructor(private router: Router,private service: TaskService,private projectService: ProjectService,private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
    this.projectService.refreshList();
  }
EditTask(tas: Tasksearch)
{
  this.service.buttonLabelName = 'Update Task';
  this.service.isUpdate = true;
  var tsk: Task;
  if(tas.TaskStartDate == '01/01/0001')
      tsk.Start_Date = null;
  if(tas.TaskEndDate == '01/01/0001')
      tsk.End_Date = null;
  tsk = {
      Task_ID : tas.Task_ID,
      Parent_ID :tas.TaskParentID,
      Project_ID :tas.TaskProjectID,
      Task1 :tas.TaskName,
      Start_Date :tas.Start_Date,
      End_Date :tas.End_Date,
      Priority : Number(tas.TaskPriority),
      Status :tas.TaskStatus,
      ProjectName:tas.MappedProject,
      ParentTaskName : tas.ParentTask,
      User_ID : tas.AssignedUSerID,
      UserName:tas.First_Name,
    };
    this.service.formData = Object.assign({}, tsk);
  this.router.navigateByUrl('/tasks');
}

  onStatusUpdate(id: number) {
    if (confirm('Are you sure to end this task?')) {
      this.service.deleteTask(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.success('Task completed successfully', 'Project Manager');
      });
    }
  }

  filterItem(){
    if(this.ProjectSearchTask != '')
    {
      this.service.list1 = Object.assign([], this.service.list1).filter(
        item => item.MappedProject.toLowerCase().indexOf(this.ProjectSearchTask.toLowerCase()) > -1
     ) 
    }
    else
    {
      this.service.refreshList();
    }
  } 
  SortTask(sort: string){
    
    if(sort = "Start_Date")
    {
      this.service.list1.sort((a, b) => {
        if (a.Start_Date < b.Start_Date) return -1;
        else if (a.Start_Date > b.Start_Date) return 1;
        else return 0;
      });
    }
    else if(sort = "End_Date")
    {
      this.service.list1.sort((a, b) => {
        if (a.End_Date < b.End_Date) return -1;
        else if (a.End_Date > b.End_Date) return 1;
        else return 0;
      });
    }
    else if(sort = "Priority")
    {
      this.service.list1.sort((a, b) => {
        if (a.TaskPriority < b.TaskPriority) return -1;
        else if (a.TaskPriority > b.TaskPriority) return 1;
        else return 0;
      });
    }
    else if(sort = "Status")
    {
      this.service.list1.sort((a, b) => {
        if (a.TaskStatus < b.TaskStatus) return -1;
        else if (a.TaskStatus > b.TaskStatus) return 1;
        else return 0;
      });
    }
    
  } 
  openProjectModal(projectcontent) {
    this.projectSearch = '';
    this.modalService.open(projectcontent, { size: 'lg' });
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
  populateProjectName(pro: Projectsearch) {
    this.ProjectSearchTask = pro.ProjectName;
    this.filterItem();
    this.modalService.dismissAll();
  }
}
