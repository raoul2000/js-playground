import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NodeModel } from '../service/model';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  @Input() node: NodeModel;

  formNode: NodeModel;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log("change", this.node);
    
  }
  save(updatedNode) {
    console.log(updatedNode);
  }
}
