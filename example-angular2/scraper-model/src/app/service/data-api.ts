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

  public create(model:DocumentModel):Observable<DocumentModel> {
    return this.http.post(
      this.baseURL,
      DocumentSerializer.serializeToJSON(model),
      {
        headers : new HttpHeaders().set('Content-Type', 'application/json' ),
        params  : new HttpParams().set('r','scraper/api/create')
      }
    ).map(data => {
      console.log(data);
      return  DocumentParser.parseJSONString(data);
    } );
  }

  public update(model:DocumentModel) {
    return this.http.put(
      this.baseURL,
      DocumentSerializer.serializeToJSON(model),
      {
        headers : new HttpHeaders().set('Content-Type', 'application/json' ),
        params  : new HttpParams()
          .set('r','scraper/api/update')
          .set('id',model.getId())
      }
    ).map(res => {
      console.log(res);
      return "1";
    } );

  }

  public delete(model:DocumentModel) {
    return this.http.delete(
      this.baseURL,
      {
        headers : new HttpHeaders().set('Content-Type', 'application/json' ),
        params  : new HttpParams()
          .set('r','scraper/api/delete')
          .set('id',model.getId())
      }
    ).map(res => {
      console.log(res);
      return "1";
    } );
  }

  public getList():Observable<DocumentSummary[]>  {
    return this.http.get<any[]>(
      this.baseURL,
      {
        headers : new HttpHeaders().set('Content-Type', 'application/json' ),
        params  : new HttpParams().set('r','scraper/api')
      }
    ).map(data => data.map( obj => new DocumentSummary(obj.id,obj.name)));
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
