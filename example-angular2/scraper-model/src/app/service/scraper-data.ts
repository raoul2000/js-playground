import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DocumentModel } from './model';
import { DocumentParser } from './doc-parser'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ScraperDataService {

  constructor(private http: Http) {
  }

  list():Observable<Array<DocumentModel>> {
    return this.http.get('http://localhost:3000/documents' )
    .map( res => res.json())
    .map( json => {
      console.log(json);
      return json.map( doc => {
        console.log("processing item : ", doc)
         return DocumentParser.parseJSONString(doc);
      });
    });
  }
}
