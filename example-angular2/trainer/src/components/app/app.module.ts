import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TrainerAppComponent }  from './app.component';
import {WorkoutRunnerModule} from '../workout-runner/workout-runner.module';
import { StartModule } from '../start/start.module';
import { FinishModule } from '../finish/finish.module';
import { routing } from './app.routes';
import { ServicesModule } from '../../service/services.module';


@NgModule({
  imports: [BrowserModule, WorkoutRunnerModule, StartModule, FinishModule, routing, ServicesModule],
  declarations: [TrainerAppComponent],
  bootstrap: [TrainerAppComponent]
})
export class AppModule { }
