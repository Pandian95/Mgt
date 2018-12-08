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

  constructor(private service: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(usr: User) {
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

}
