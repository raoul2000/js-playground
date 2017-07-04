import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NodeModel, NodeType } from '../service/model';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  // WARNING : values index must match the NodeType enum values
  typeValues: string[] = ["text", "HTML", "composite"];
  @Input() node: NodeModel;

  formNode: NodeModel;

  constructor() { }

  ngOnInit() {
    console.log('init', this.node);

  }
  ngOnChanges() {
    console.log("change", this.node);

  }
  save(updatedNode) {
    console.log(updatedNode);
  }
  onChange(val) {
    console.log('change',val);
  }
  addNode() {
    if(this.node) {
      let newNode = this.node.getOwnerDocument().createNode('new');
      this.node.addChild(newNode);
      this.node.getOwnerDocument().select(newNode);
      newNode.getParent().setExpanded(true);
    }
  }
  deleteNode() {
    if(this.node && ! this.node.isRootNode() ) {
      let parent:NodeModel = this.node.getParent();
      this.node.remove();
      this.node = parent;
      parent.select(parent);
    }
  }
}
