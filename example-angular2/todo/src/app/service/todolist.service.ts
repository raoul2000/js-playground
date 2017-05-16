import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { TaskModel, TodolistModel } from './models.service';
import { ITodolistService } from './interface-todo.service';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class TodolistService  {

  constructor(
    private apiService: ApiService
  )
  { }

  list():Observable<Array<TodolistModel>> {
    return this.apiService.getAllTodolist()
  }
}
