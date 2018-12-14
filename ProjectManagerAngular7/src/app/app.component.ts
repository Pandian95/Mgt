import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'Project Manager';

  routeLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.routeLinks = [
        {
            label: 'Add Project',
            link: './projects',
            index: 0
        }, {
            label: 'Add Task',
            link: './tasks',
            index: 1
        }, {
            label: 'Add User',
            link: './users',
            index: 2
        }, {
            label: 'View Task',
            link: './tasklist',
            index: 3
        }
    ];
}

ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

}
