import { Component, OnInit } from '@angular/core';
import { NodeModel, DocumentModel } from '../service/model';
import { DocumentParser } from '../service/doc-parser';
import { DocumentSerializer } from '../service/doc-serializer';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ScraperDataService } from '../service/scraper-data'
import { DataAPI } from '../service/data-api'


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public nodes: Array<any>;
  public doc: DocumentModel;
  private selectedNode: NodeModel;
  public modelLoaded:boolean = false;
  public createMode:boolean = false;

  title = 'Scraper';

  constructor(
    private api: ScraperDataService,
    private scraperAPI:DataAPI,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.map(segments => segments.join('')).subscribe(url => {
      console.log(url);
      if( url === 'create' ) {
          this.doc = new DocumentModel("tmp");
          this.nodes = [this.doc.getRootNode()];
          this.modelLoaded = true;
          this.createMode = true;
      } else {

        this.route.paramMap.subscribe((params: ParamMap) => {
          const id = params.get('id');
          console.log("id = ",id);
          this.scraperAPI.view(id)
          .subscribe(
            res => {
              console.log(res);
              this.doc = res;
              this.nodes = [res.getRootNode()];
              this.modelLoaded = true;
              this.createMode = false;
            },
            error => {
              console.error('ERROR',error);
            });
          });
      }
    });
  }

  nodeSelectedEvent(node: NodeModel) {
    this.selectedNode = node;
    this.doc.select(this.selectedNode);
  }
  cancel() {
    this.router.navigate(['/']);
  }

  update(){
    this.scraperAPI.update(this.doc)
    .subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.error('ERROR',error);
      }
    );
    /*
      this.api.saveDocument(this.doc).subscribe(res => {
        console.log("saved", res);
        this.router.navigate(['/']);
      });
      */
  }
  create() {
    this.scraperAPI.create(this.doc)
    .subscribe(
      res => {
        console.log(res);
        this.doc = res;
        this.nodes = [res.getRootNode()];
        this.createMode = false;
      },
      error => {
        console.error('ERROR',error);
      }
    );

  }
  save() {
    if(this.createMode ) {
      this.create();
    } else {
      this.update();
    }
  }
  deselect() {
    this.selectedNode = null;
    this.doc.select();
  }

  serialize() {
    let obj = DocumentSerializer.serializeToJSON(this.doc);
    console.log(obj);
  }
  parseJSONString() {
    let obj = {
      'id': "11223344",
      'name': "sample document",
      "root": {
        'p0-default': {
          "selector": "p1.selector"
        },
        'p1': {
          "selector": "p1.selector",
          "type": "text"
        },
        'p1-array': {
          "selector": "p1-array.selector (string array)",
          "type": ["text"]
        },
        'p1-html-simple': {
          "selector": "p1-html-simple.selector",
          "type": "html"
        },
        'p1-html-array': {
          "selector": "p1-html-array.selector",
          "type": ["html"]
        },
        'p2': {
          "selector": "p2.selector",
          "type": {
            'C1': {
              "selector": "C1.selector",
              "type": "text"
            },
          },
        },
        'p2-deep-blue': {
          "selector": "p2.selector (deep blue)",
          "type": {
            'C1': {
              "selector": "C1.selector",
              "type": {
                'D1': {
                  "selector": "I am D1",
                  "type": {
                    "E1": {
                      "selector": "I am E1"
                    }
                  }
                }
              }
            },
          },
        },
        'p2-obj-list': {
          "selector": "p2.selector obj list",
          "type": [{
            'C1': {
              "selector": "C1.selector",
              "type": "text"
            }
          }]
        }
      }
    };
    this.doc = DocumentParser.parseJSONString(JSON.stringify(obj));
    this.deselect();
    this.nodes = [this.doc.getRootNode()];
  }
}
