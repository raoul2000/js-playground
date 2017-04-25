import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TaskModel } from './models.service';
import { ITodoService } from './interface-todo.service';


@Injectable()
export class FakeTodoService implements ITodoService {

  constructor(private apiService: ApiService) { }

  listByTitle(title:string):Array<TaskModel> {
    return [
      new TaskModel( "do something cool "+title, false),
      new TaskModel( "do something even more cool "+title, true)
    ];
  }
  createTask(task: TaskModel){
    console.log("creating task "+task.description);
  }
  updateTask(task: TaskModel){
    console.log("updating task "+task.description);
  }
  deleteTask(task: TaskModel) {
    console.log("deleting task "+task.description);
  }

}
