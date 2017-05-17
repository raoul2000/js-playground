import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/Http';

import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { TodoService } from './service/todo.service';
import { TodolistService } from './service/todolist.service';
import { FakeTodoService } from './service/fake-todo.service';
import { TodoListComponent } from './component/todo-view/todo-list/todo-list.component';
import { TodoFormComponent } from './component/todo-view/todo-form/todo-form.component';
import { TodoViewComponent } from './component/todo-view/todo-view.component';
import { ListViewComponent } from './component/list-view/list-view.component';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

const IS_PROD = true;

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    TodoViewComponent,
    ListViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    { provide : ApiService,  useClass : ApiService},
    //{ provide : TodoService, useClass : IS_PROD ? TodoService : FakeTodoService},
    { provide : TodoService, useClass : TodoService },
    { provide : TodolistService, useClass : TodolistService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
