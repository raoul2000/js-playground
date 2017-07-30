import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NodeModel, DocumentModel } from '../service/model';
import { ScraperDataService } from '../service/scraper-data'
import { DocumentCloner } from '../service/doc-cloner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public items: Array<DocumentModel> = null;

  constructor(
    private api: ScraperDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      //const refresh:boolean = params.get('refresh') === "true";
      this.loadDocumentList(true);
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
    this.api.list()
    .subscribe(docList => {
      this.items = docList;
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
