import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NodeModel, DocumentModel, DocumentSummary } from '../service/model';
import { ScraperDataService } from '../service/scraper-data'
import { DataAPI } from '../service/data-api'
import { DocumentCloner } from '../service/doc-cloner';
import { DocumentParser } from '../service/doc-parser';
import { DocumentSerializer } from '../service/doc-serializer';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public items: Array<DocumentModel> = null;
  public itemInfo: Array<DocumentSummary> = null;
  private listLoaded:boolean = false;
  private connectionError:boolean = false;

  constructor(
    private api: ScraperDataService,
    private scraperAPI:DataAPI,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getList();
    /*
    this.route.paramMap.subscribe((params: ParamMap) => {
      //const refresh:boolean = params.get('refresh') === "true";
      this.getList();
    });
    */
  }
  view() {
    console.log('view');
    this.scraperAPI.view("22")
    .subscribe(
      res => {console.log(res)},
      error => {
        console.error('ERROR',error);
      }
    );

  }
  createModel() {
    console.log('createModel');
    let doc = DocumentParser.parseJSONString(JSON.stringify({
      'name': "sample document",
      "json" : "{}"
    }));
    this.scraperAPI.create(doc)
    .subscribe(
      res => {console.log(res)},
      error => {
        console.error('ERROR',error);
      });
  }

  updateModel() {
    console.log('updateModel');
    let doc = DocumentParser.parseJSONString(JSON.stringify({
      "id" : 23,
      'name': "sample document 22222",
      "json" : "{}"
    }));
    this.scraperAPI.update(doc)
    .subscribe(
      res => {console.log(res)},
      error => {
        console.error('ERROR',error);
      });
  }
  getList() {
    console.log("getList");
    this.listLoaded = false;
    this.connectionError = false;
    this.scraperAPI.getList()
    .subscribe(
      res => {
        console.log(res);

        this.itemInfo = res;
        this.listLoaded = true;
      },
      error => {
        console.error('ERROR',error);
        this.connectionError = true;
      });
  }
  refresh() {
    this.getList();
  }

  newDocument() {
    this.api.selectedDoc = new DocumentModel();
    this.router.navigate(['/editor']);
  }

  create(){
    this.router.navigate(['/create']);
  }
  editModel(model: DocumentSummary) {
    console.log('editModel', model);
    this.router.navigate(['/editor', model.getId()]);
  }

  deleteModel(model: DocumentModel) {
    this.scraperAPI.delete(model)
    .subscribe(
      res => {console.log(res)},
      error => {
        console.error('ERROR',error);
      });

  }
}
