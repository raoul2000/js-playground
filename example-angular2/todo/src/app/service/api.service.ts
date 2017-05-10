import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ApiService {


  constructor(private http: Http) {
  }

  get(path) {

  }

  getAllTodolist():Observable<any> {
      return this.http.get("/api/todolists")
      .map( res => res.json());
  }


}
