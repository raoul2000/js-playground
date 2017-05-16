import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { TaskModel } from './models.service';
import { ITodoService } from './interface-todo.service';

import { Http, Response } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TodoService implements ITodoService {
  private baseUrl:string = "http://localhost:3000";
  constructor(
    private apiService: ApiService,
    private http: Http
  ) { }

  listByTitle(title:string):Array<TaskModel> {
    return [];
  }

  getTasksByTitle(title:string):Observable<TaskModel[]> {
    return this.http.get( this.baseUrl+"/api/task")
    .map( res => {
      console.log(res);
        return [ new TaskModel("eee",true)];
    });
    //.map( resp => resp.json());
  }
  createTask(task: TaskModel){

  }
  updateTask(task: TaskModel){

  }
  deleteTask(task: TaskModel) {

  }
}
