import { Component } from '@angular/core';
import { NodeModel, DocumentModel } from './service/model';
import { DocumentParser } from './service/doc-parser';
import { DocumentSerializer } from './service/doc-serializer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
