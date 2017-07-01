import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  @Input() nodes: Array<any>;
  constructor() { }

  ngOnInit() {
  }

}
