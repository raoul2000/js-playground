import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TaskModel } from './models.service';
import { ITodoService } from './interface-todo.service';


@Injectable()
export class FakeTodoService implements ITodoService {

  constructor(private apiService: ApiService) { }

  list():Array<TaskModel> {
    return [
      new TaskModel( "do something cool", false),
      new TaskModel( "do something even more cool", true)
    ];
  }
}
