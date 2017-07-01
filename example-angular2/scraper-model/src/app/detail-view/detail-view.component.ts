import { Component, OnInit, Input } from '@angular/core';
import { NodeModel } from '../service/model';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  @Input() node: NodeModel;
  
  constructor() { }

  ngOnInit() {
  }

}
