import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private service: TaskService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  projectData = [{
    id: 1,
    name: "Foo"
  }, {
    id: 2,
    name: "Bar"
  }]

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
        Task_ID : null,
        Parent_ID :null,
        Project_ID :null,
        Task1 :null,
        Start_Date :null,
        End_Date :null,
        Priority :null,
        Status :null
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.Task_ID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postTask(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Project Manager');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
  updateRecord(form: NgForm) {
    this.service.putTask(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Project Manager');
      this.resetForm(form);
      this.service.refreshList();
    });

}


}
