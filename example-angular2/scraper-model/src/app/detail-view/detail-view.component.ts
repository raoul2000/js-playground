import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NodeModel } from '../service/model';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
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
}
