import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WorkoutHistoryTracker } from './workout-history-tracker';

@NgModule({
    imports: [],
    declarations: [],
    // below, short for
    // providers : [
    //  {
    //      provide : WorkoutHistoryTracker,
    //      useClass : WorkoutHistoryTracker
    //  }
    // ]
    providers: [
        WorkoutHistoryTracker,
    ]
})
export class ServicesModule { }
