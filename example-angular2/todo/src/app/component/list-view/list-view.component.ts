import { Component, OnInit } from '@angular/core';
import { TodolistModel } from '../../service/models.service';
import { TodolistService } from '../../service/todolist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  todolists : Array<TodolistModel>;

  constructor(
    private service: TodolistService,
    private router: Router
  ) { }

  ngOnInit() {
    this.todolists = this.service.list();
  }

  viewTodolist(list:TodolistModel) {
    console.log(list);
    this.router.navigate(['/todo', list.title]);
  }

}
