import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeModel, DocumentModel } from '../service/model';
import { ScraperDataService } from '../service/scraper-data'
import { DocumentCloner } from '../service/doc-cloner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public items:Array<DocumentModel> = null;

  constructor(
    private api:ScraperDataService,
    private router:Router
  ) { }

  ngOnInit() {
    if( this.items === null ) {
      this.api.list()
      .subscribe( docList => {
        this.items = docList;
      });
    }
  }

  loadDocumentList() {

  }

  editModel(model:DocumentModel) {
    console.log('editModel', model);
    this.api.selectedDoc = DocumentCloner.clone(model);
    this.router.navigate(['/editor']);
  }
}
