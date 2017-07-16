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


  list():Observable<Array<DocumentModel>> {

    var enableCache = false;
    //if( this.cache ) {

    if( enableCache ) {

      return Observable.create(observer => {
        observer.onNext(this.cache);
        observer.onCompleted();
        return () => console.log('disposed');
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
