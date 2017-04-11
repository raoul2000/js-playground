import { Router, Event } from '@angular/router';
import {Component} from '@angular/core';

@Component({
    selector: 'header',
    template: `<div class="navbar-header">
                <h1>7 Minute Workout</h1>
             </div>
             <ul class="nav navbar-nav navbar-right">
                <li *ngIf="showHistoryLink"><a [routerLink]="['history']" title="Workout History">History</a></li>
             </ul>`
})
export class HeaderComponent {
  showHistoryLink:boolean = true;
  private subscription:any;
  constructor(private router:Router){
    this.router.events.subscribe((data:Event) => {
      this.showHistoryLink = ! this.router.url.startsWith('/workout');
    });
  }
}
