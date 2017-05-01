import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskModel } from './service/models.service';

import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo List App';

  constructor(
    private pageTitle: Title,
    private meta: Meta) { }

  ngOnInit() {
    this.pageTitle.setTitle("Todo App");
    this.meta.addTag( { name : 'author', content : 'raoul2000'});
  }
}
