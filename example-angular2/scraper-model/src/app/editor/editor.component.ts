import { Component, OnInit } from '@angular/core';
import { NodeModel, DocumentModel } from '../service/model';
import { DocumentParser } from '../service/doc-parser';
import { DocumentSerializer } from '../service/doc-serializer';
import { Router, ActivatedRoute } from '@angular/router';
import { ScraperDataService } from '../service/scraper-data'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public nodes:Array<any>;
  public doc:DocumentModel;
  private selectedNode: NodeModel;

  title = 'Scraper';

  constructor(
    private api:ScraperDataService,
    private router: Router
  ){}

  ngOnInit() {
    if(this.api.selectedDoc) {
      console.log('ngOnInit',this.api.selectedDoc);
      this.doc = this.api.selectedDoc;
      this.nodes =  [this.doc.getRootNode()];
    }
  }

  nodeSelectedEvent(node: NodeModel) {
    this.selectedNode = node;
    this.doc.select(this.selectedNode);
  }
  cancel() {
    this.router.navigate(['/']);
  }

  save() {

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
      '__document' : {
        'id' : "11223344",
        'name' : "sample document"
      },
      'p0-default' : {
        "selector" : "p1.selector"
      },
      'p1' : {
        "selector" : "p1.selector",
        "type" : "text"
      },
      'p1-array' : {
        "selector" : "p1-array.selector (string array)",
        "type" : ["text"]
      },
      'p1-html-simple' : {
        "selector" : "p1-html-simple.selector",
        "type" : "html"
      },
      'p1-html-array' : {
        "selector" : "p1-html-array.selector",
        "type" : ["html"]
      },
      'p2' : {
        "selector" : "p2.selector",
        "type" : {
          'C1' : {
            "selector" : "C1.selector",
            "type" : "text"
          },
        },
      },
      'p2-deep-blue' : {
        "selector" : "p2.selector (deep blue)",
        "type" : {
          'C1' : {
            "selector" : "C1.selector",
            "type" : {
                'D1' : {
                  "selector" : "I am D1",
                  "type" : {
                    "E1" : {
                      "selector" : "I am E1"
                    }
                  }
                }
            }
          },
        },
      },
      'p2-obj-list' : {
        "selector" : "p2.selector obj list",
        "type" : [{
          'C1' : {
            "selector" : "C1.selector",
            "type" : "text"
          }
        }]
      }
    };
    this.doc = DocumentParser.parseJSONString(JSON.stringify(obj));
    this.deselect();
    this.nodes = [this.doc.getRootNode()];
  }
}
