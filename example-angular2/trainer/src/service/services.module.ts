import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WorkoutHistoryTracker } from './workout-history-tracker';
import { LocalStorage } from './local-storage';

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
        LocalStorage
    ]
})
export class ServicesModule { }
