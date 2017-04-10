import {Component} from '@angular/core';
import { WorkoutHistoryTracker } from '../../service/workout-history-tracker'
@Component({
    selector: 'trainer-app',
    template: `<div class="navbar navbar-default navbar-fixed-top top-navbar">
                <div class="container app-container">
                  <header></header>
                </div>
              </div>
              <div class="container body-content app-container">
                <router-outlet></router-outlet>
              </div>`,
//  providers : [
//    WorkoutHistoryTracker
//  ]

})
export class TrainerAppComponent {
}