import { Component } from '@angular/core';
import { NodeModel } from './service/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public nodes:Array<any>;

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
    this.nodes[0].addChild(new NodeModel('new'));
  }

  nodeSelected(node) {
    console.log("app",node);
  }
}
