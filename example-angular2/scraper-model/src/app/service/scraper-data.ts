import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DocumentModel } from './model';
import { DocumentParser } from './doc-parser'
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
