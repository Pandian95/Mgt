import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      document.getElementById('lblButtonName').innerHTML = 'Add';

    this.service.formData = {
      User_ID: null,
      First_Name: '',
      Last_Name: '',
      Employee_ID: null,
      Project_ID:null,
      Task_ID:null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.User_ID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postUser(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Project Manager');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
  updateRecord(form: NgForm) {
    this.service.putUser(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Project Manager');
      this.resetForm(form);
      this.service.refreshList();
    });

}}
