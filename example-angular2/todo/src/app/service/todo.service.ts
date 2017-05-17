import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { TaskModel } from './models.service';
import { ITodoService } from './interface-todo.service';

import { Http, Response } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TodoService  {
  private baseUrl:string = "http://localhost:3000";
  constructor(
    private apiService: ApiService,
    private http: Http
  ) { }

  getTodosByListId(listId:number):Observable<TaskModel[]>{
    return this.http.get(
      this.baseUrl+"/api/task",
      {
        params: { listId: listId }
      }
   )
    .map( res => {
      return res.json().map(item => {
        return new TaskModel(item.description, item.completed, item.id);
      })
    });
  }

  createTask(task: TaskModel):Observable<TaskModel>{
    return this.http.post(this.baseUrl+"/api/task/",task)
    .map( res => {
      let o = res.json();
      let newTask = new TaskModel(o.description, o.completed, o.id);
      return newTask;
    });
  }

  updateTask(task: TaskModel):Observable<TaskModel>{
    return this.http.patch(this.baseUrl+"/api/task/"+task.getId(),task)
    .map( res => {
      let o = res.json();
      return new TaskModel(o.description, o.completed, o.id);
    });
  }

  deleteTask(task: TaskModel) {

  }
}
