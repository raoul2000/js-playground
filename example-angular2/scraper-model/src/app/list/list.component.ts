import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NodeModel, DocumentModel } from '../service/model';
import { ScraperDataService } from '../service/scraper-data'
import { DataAPI } from '../service/data-api'
import { DocumentCloner } from '../service/doc-cloner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public items: Array<DocumentModel> = null;
  private listLoaded:boolean = false;
  private connectionError:boolean = false;

  constructor(
    private api: ScraperDataService,
    private scraperAPI:DataAPI,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    /*
    this.route.paramMap.subscribe((params: ParamMap) => {
      //const refresh:boolean = params.get('refresh') === "true";
      this.loadDocumentList(true);
    });
    */
  }
  getList() {
    console.log("getList");
    this.scraperAPI.getList()
    .subscribe(
      res => {console.log(res)},
      error => {
        console.error('ERROR',error);
      });
  }
  refresh() {
    this.loadDocumentList(true);
  }

  newDocument() {
    this.api.selectedDoc = new DocumentModel();
    this.router.navigate(['/editor']);

  }

  loadDocumentList(forceReload = false) {
    if(forceReload ) {
      this.api.clearCache();
    }
    this.connectionError = false;
    this.listLoaded = false;
    this.api.list()
    .subscribe(docList => {
      this.items = docList;
      this.listLoaded = true;
    },
    error => {
      console.log(error);
      this.connectionError = true;
    });
  }

  editModel(model: DocumentModel) {
    console.log('editModel', model);
    this.api.selectedDoc = DocumentCloner.clone(model);
    this.router.navigate(['/editor']);
  }

  deleteModel(model: DocumentModel) {
    // TODO : implement
  }
}
