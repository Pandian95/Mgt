import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../shared/project.service';
import { Project } from 'src/app/shared/project.model';
import { Projectsearch } from 'src/app/shared/projectsearch.model';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  
  projectSearch: string;
  column: string = 'End_Date';

  constructor(private service: ProjectService,private orderPipe: OrderPipe,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pro: Projectsearch) {
    document.getElementById('lblButtonName').innerHTML = 'Update';
    
    if(pro.Project_Start_Date == '01/01/0001' || pro.Project_Start_Date == '1/1/1901')
    {
      pro.Project_Start_Date = null;
      pro.Start_Date = null;
    }
      
    if(pro.Project_End_Date == '01/01/0001' || pro.Project_End_Date == '1/1/1901')
    {
      pro.Project_End_Date = null;
      pro.End_Date = null;
    }
      
      
    if(pro.Project_Start_Date != null)
    {
      this.service.setCheckBoxStartEnd = true;
    }
    else
    {
      this.service.setCheckBoxStartEnd = false;
    }

    var proj1: Project;
    proj1 = {
      Project_ID : pro.Project_ID,
      Project1 : pro.ProjectName,
      Start_Date : pro.Start_Date,
      End_Date : pro.End_Date,
      Priority : pro.Project_Priority,
      Manager : pro.UserFullName,
      Manager_ID : pro.User_ID
    };
    this.service.formData = Object.assign({}, proj1);
  }

  filterItem(){
    if(this.projectSearch != '')
    {
      this.service.list1 = Object.assign([], this.service.list1).filter(
        item => item.ProjectName.toLowerCase().indexOf(this.projectSearch.toLowerCase()) > -1
     ) 
    }
    else
    {
      this.service.refreshList();
    }
  } 
  SortProject(sort: string){
    
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
        if (a.Project_Priority < b.Project_Priority) return -1;
        else if (a.Project_Priority > b.Project_Priority) return 1;
        else return 0;
      });
    }
    else if(sort = "No_OfTaskCompleted")
    {
      this.service.list1.sort((a, b) => {
        if (a.No_OfTaskCompleted < b.No_OfTaskCompleted) return -1;
        else if (a.No_OfTaskCompleted > b.No_OfTaskCompleted) return 1;
        else return 0;
      });
    }
    
  } 

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteProject(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Project Manager');
      });
    }
  }


}
