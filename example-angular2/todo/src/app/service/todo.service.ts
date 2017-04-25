import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { TaskModel } from './models.service';
import { ITodoService } from './interface-todo.service';


@Injectable()
export class TodoService implements ITodoService {

  constructor(private apiService: ApiService) { }

  listByTitle(title:string):Array<TaskModel> {
    return this.apiService.get('/todos');
  }
  createTask(task: TaskModel){

  }
  updateTask(task: TaskModel){

  }
  deleteTask(task: TaskModel) {

  }
}
