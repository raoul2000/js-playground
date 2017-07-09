import { Component, OnInit } from '@angular/core';
import { NodeModel, DocumentModel } from '../service/model';
import { ScraperDataService } from '../service/scraper-data'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items:Array<DocumentModel> = [];

  constructor(private api:ScraperDataService) { }

  ngOnInit() {
    this.api.list()
    .subscribe( docList => {
      this.items = docList;
    });
  }

  loadDocumentList() {

  }

}
