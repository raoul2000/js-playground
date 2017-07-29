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
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    let jsonDoc = DocumentSerializer.serializeToJSON(newDoc);
    jsonDoc.id = newDoc.getId(); // preserve ID for json server

    return this.http.post(
      'http://localhost:3000/documents',
      jsonDoc,
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


  list():Observable<Array<DocumentModel>> {

    var enableCache = true;
    //if( this.cache ) {

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
