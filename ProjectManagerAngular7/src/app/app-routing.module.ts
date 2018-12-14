import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: '/projects',
      pathMatch: 'full'
  },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'users', component: UsersComponent },
   { path: 'tasklist', component: TaskListComponent }

];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
