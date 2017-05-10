import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { TaskModel, TodolistModel } from './models.service';
import { ITodolistService } from './interface-todo.service';


@Injectable()
export class TodolistService implements ITodolistService {

  constructor(
    private apiService: ApiService
  )
  { }

  list():Array<TodolistModel> {
    //return this.apiService.get('/todos');
    this.apiService.getAllTodolist()
    .map( jsonResponse => <TodolistModel>jsonResponse);
    return [
      new TodolistModel("list 1"),
      new TodolistModel("list 2"),
      new TodolistModel("list 3")
    ];
  }
}
