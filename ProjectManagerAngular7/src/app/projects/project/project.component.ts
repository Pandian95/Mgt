import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private service: ProjectService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Project_ID: null,
      Project1: '',
      Start_Date: null,
      End_Date: null,
      Priority:''
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.User_ID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postProject(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Project Manager');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
  updateRecord(form: NgForm) {
    this.service.putProject(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Project Manager');
      this.resetForm(form);
      this.service.refreshList();
    });

}

}
