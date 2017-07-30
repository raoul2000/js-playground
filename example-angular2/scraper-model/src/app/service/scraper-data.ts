import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DocumentModel } from './model';
import { DocumentParser } from './doc-parser'
import { DocumentSerializer } from './doc-serializer'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ScraperDataService {

  private cache:Array<DocumentModel> = null;
  public selectedDoc:DocumentModel = null;

  constructor(private http: Http) {
  }
  clearCache() {
    this.cache = null;
  }

  saveDocument(newDoc:DocumentModel): Observable<Response> {
    return this.http.post(
      'http://localhost:3000/documents',
      DocumentSerializer.serializeToJSON(newDoc),
      {
        headers : new Headers({ 'Content-Type': 'application/json' })
      })
      .map( res => {
        if(res.ok) {
          let updatedCache:Array<DocumentModel>;
          updatedCache = this.cache.map(doc => {
            if( doc.getId() === newDoc.getId()) {
              return newDoc;
            } else {
              return doc;
            }
          });
          this.cache = updatedCache;
        } else {
          console.error("response error",res);
        }
        return res;
      });
  }

  /**
   * Returns a list of document retrieved from the server
   * or from the internal cache.
   * @return {Observable} [description]
   */
  list():Observable<Array<DocumentModel>> {
    var enableCache = true;
    if( enableCache && this.cache ) {
      return new Observable(observer => {
        observer.next(this.cache);
      });
    } else {
      return this.http.get('http://localhost:3000/documents' )
      .map( res => res.json())
      .map( json => {
        console.log(json);
        this.cache =  json.map( doc => {
          console.log("processing item : ", doc)
          return DocumentParser.parseJSONString(doc);
        });
        return this.cache;
      });
    }
  }
}
