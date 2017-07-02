import { Component } from '@angular/core';
import { NodeModel } from './service/model';

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
    let root = new NodeModel("root");

    let child3 = new NodeModel("child3");
    child3.addChild(new NodeModel("child 4"));
    child3.addChild(new NodeModel("child 5"));

    root.addChild(child3);

    root.addChild(new NodeModel("child1"));
    root.addChild(new NodeModel("child2"));

    this.nodes = [ root ];
  }

  addNode() {
    if(this.selectedNode) {
      this.selectedNode.addChild(new NodeModel('new'));
    } else {
      this.nodes[0].addChild(new NodeModel('new'));
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
