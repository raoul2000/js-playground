import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { NodeModel, NodeType } from '../service/model';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent {
  // WARNING : values index must match the NodeType enum values
  typeValues: string[] = ["text", "HTML", "composite"];
  @Input() node: NodeModel;
  @Output() nodeSelectedEvent = new EventEmitter<NodeModel>();
  formNode: NodeModel;

  constructor() { }

  addNode() {
    if(this.node) {
      let newNode = this.node.getOwnerDocument().createNode('new');
      this.node.addChild(newNode);
      this.node.getOwnerDocument().select(newNode);
      newNode.getParent().setExpanded(true);
      this.nodeSelectedEvent.emit(newNode);
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
