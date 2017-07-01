import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodeModel } from '../service/model';


@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  @Input() nodes: Array<any>;
  @Output() nodeSelectedEvent = new EventEmitter<NodeModel>();

  constructor() { }

  ngOnInit() {
  }
  
  nodeSelected(node:NodeModel) {
    console.log("node selected");
    this.nodeSelectedEvent.emit(node);
  }
}
