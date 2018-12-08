import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../shared/task.service';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private service: TaskService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(tas: Task) {
    this.service.formData = Object.assign({}, tas);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteTask(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Project Manager');
      });
    }
  }



}
