import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { TodoService } from './service/todo.service';
import { FakeTodoService } from './service/fake-todo.service';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoFormComponent } from './component/todo-form/todo-form.component';

const IS_PROD = false;

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide : ApiService,  useClass : ApiService},
    { provide : TodoService, useClass : IS_PROD ? TodoService : FakeTodoService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
