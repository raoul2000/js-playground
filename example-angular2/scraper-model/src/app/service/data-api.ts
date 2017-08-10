import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DocumentModel, DocumentSummary } from './model';
import { DocumentParser } from './doc-parser'
import { DocumentSerializer } from './doc-serializer'
import { Observable } from 'rxjs/Observable';

interface ListResponse {

}

@Injectable()
export class DataAPI {
  private baseURL:string = 'http://localhost/dev/yii2-app/web/index.php';

  constructor(private http: HttpClient)
  {}

  public getBaseURL():string {
    return this.baseURL;
  }

  public create(model:DocumentModel):Observable<string> {
    return this.http.post(
      this.baseURL,
      DocumentSerializer.serializeToJSON(model),
      {
        headers : new HttpHeaders().set('Content-Type', 'application/json' ),
        params  : new HttpParams().set('r','scraper/api/create')
      }
    ).map(res => {
      console.log(res);
      return "1";
    } );
  }

  public update(model:DocumentModel) {

  }

  public delete(model:DocumentModel) {

  }

  public getList() {
    return this.http.get<DocumentSummary[]>(
      this.baseURL,
      {
        headers : new HttpHeaders().set('Content-Type', 'application/json' ),
        params  : new HttpParams().set('r','scraper/api')
      }
    ).map(data => {
      console.log(data);
      return data.map( item =>  DocumentParser.parseJSONString(item));
      //return data;
    } );
  }

  public view(id:string):Observable<DocumentModel> {
    return this.http.get(
      this.baseURL,
      {
        headers : new HttpHeaders().set('Content-Type', 'application/json' ),
        params  : new HttpParams()
          .set('r','scraper/api/view')
          .set('id',id)
      }
    ).map(data => {
      console.log(data);
      return  DocumentParser.parseJSONString(data);
    });
  }
}
