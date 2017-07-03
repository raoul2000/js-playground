import { Component } from '@angular/core';
import { NodeModel, DocumentModel } from './service/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public nodes:Array<any>;
  private selectedNode: NodeModel;

  title = 'app works!';

  constructor(){
    let doc = new DocumentModel();

    let root = doc.getRootNode();

    let child3 = doc.createNode("child3");
    child3.addChild( doc.createNode("child 4"));
    child3.addChild( doc.createNode("child 5"));

    root.addChild(child3);

    root.addChild( doc.createNode("child1"));
    root.addChild( doc.createNode("child2"));

    this.nodes = [ root ];
  }

  addNode() {
    if(this.selectedNode) {
      this.selectedNode.addChild( this.selectedNode.getOwnerDocument().createNode('new'));
    }
  }
  deleteNode() {
    if(this.selectedNode) {
      this.selectedNode.remove();
    }
  }
  nodeSelected(node: NodeModel) {
    this.selectedNode = node;
    this.nodes.forEach(x => x.select(this.selectedNode));
  }

  deselect() {
    this.selectedNode = null;
    this.nodes.forEach(x => x.deselect());
  }
}
