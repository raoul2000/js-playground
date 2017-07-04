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
      'p1' : {
        "selector" : "p1.selector",
        "type" : "text"
      },
      'p2' : {
        "selector" : "p2.selector",
        "type" : {
          'C1' : {
            "selector" : "C1.selector",
            "type" : "text"
          },

        }
      }
    };
    let doc:DocumentModel = DocumentParser.parseJSONString(JSON.stringify(obj));

    console.log(doc);
  }
}
