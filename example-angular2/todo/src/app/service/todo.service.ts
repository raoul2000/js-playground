import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { TaskModel } from './models.service';
import { ITodoService } from './interface-todo.service';


@Injectable()
export class TodoService implements ITodoService {

  constructor(private apiService: ApiService) { }

  list():Array<TaskModel> {
    return this.apiService.get('/todos');
  }
}
