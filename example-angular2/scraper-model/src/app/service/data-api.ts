import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { DocumentModel } from './model';
import { DocumentParser } from './doc-parser'
import { DocumentSerializer } from './doc-serializer'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataAPI {

  constructor(private baseURL:string, private http: Http)
  {}

  public getBaseURL():string {
    return this.baseURL;
  }

  public create(model:DocumentModel):Observable<string> {
    return this.http.post(
      this.baseURL,
      DocumentSerializer.serializeToJSON(model),
      {
        headers : new Headers({ 'Content-Type': 'application/json' }),
        params : new HttpParams().set('r','scraper/api/create')
      }
    ).map(res => "1");
  }

  public update(model:DocumentModel) {

  }

  public delete(model:DocumentModel) {

  }

  public getList() {

  }
}
