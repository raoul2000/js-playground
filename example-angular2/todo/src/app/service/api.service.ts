import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { TaskModel, TodolistModel } from './models.service';

@Injectable()
export class ApiService {
  private baseUrl:string = "http://localhost:3000";

  constructor(private http: Http) {
  }

  get(path) {

  }

  getAllTodolist():Observable<Array<TodolistModel>> {
    // it should be possible to return a Observable stream where the list of todolist
    // received is splitted in several todolist
      return this.http.get(this.baseUrl+"/api/todolists")
      .map( res => {
        return res.json().map( item => <TodolistModel>item);
      });
  }
}
