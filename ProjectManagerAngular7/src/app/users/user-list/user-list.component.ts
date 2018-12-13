import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userSearch: string;

  constructor(private service: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(usr: User) {
    document.getElementById('lblButtonName').innerHTML = 'Update';
    this.service.formData = Object.assign({}, usr);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteUser(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Project Manager');
      });
    }
  }

  SortProject(sort: string){
    
    if(sort = "First_Name")
    {
      this.service.list.sort((a, b) => {
        if (a.First_Name < b.First_Name) return -1;
        else if (a.First_Name > b.First_Name) return 1;
        else return 0;
      });
    }
    else if(sort = "End_Date")
    {
      this.service.list.sort((a, b) => {
        if (a.Last_Name < b.Last_Name) return -1;
        else if (a.Last_Name > b.Last_Name) return 1;
        else return 0;
      });
    }
    else if(sort = "Priority")
    {
      this.service.list.sort((a, b) => {
        if (a.Employee_ID < b.Employee_ID) return -1;
        else if (a.Employee_ID > b.Employee_ID) return 1;
        else return 0;
      });
    }
    
  }
  filterItem(){
    if(this.userSearch != '')
    {
      this.service.list = Object.assign([], this.service.list).filter(
        item => item.First_Name.toLowerCase().indexOf(this.userSearch.toLowerCase()) > -1
     ) 
    }
    else
    {
      this.service.refreshList();
    }
  } 

}
