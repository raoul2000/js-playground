import { Component } from '@angular/core';
import { NodeModel, DocumentModel } from './service/model';
import { DocumentParser } from './service/doc-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public nodes:Array<any>;
  public doc:DocumentModel;
  private selectedNode: NodeModel;

  title = 'Scraper';

  constructor(){
    this.doc = new DocumentModel();

    let root = this.doc.getRootNode();

    let child3 = this.doc.createNode("child3");
    child3.addChild( this.doc.createNode("child 4"));
    child3.addChild( this.doc.createNode("child 5"));

    root.addChild(child3);

    root.addChild( this.doc.createNode("child1"));
    root.addChild( this.doc.createNode("child2"));
    this.nodes = [this.doc.getRootNode()];
  }


  nodeSelectedEvent(node: NodeModel) {
    this.selectedNode = node;
    this.doc.select(this.selectedNode);
  }

  deselect() {
    this.selectedNode = null;
    this.doc.select();
  }

  parseJSONString() {
    let obj = {
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
