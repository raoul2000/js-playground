import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../../service/models.service';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todoList:Array<TaskModel>;

  @Output() toggleTaskCompleteEvent = new EventEmitter<TaskModel>();
  @Output() taskDeletedEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  toggleTaskComplete(todo) {
    this.toggleTaskCompleteEvent.emit(todo);
  }
  taskDeleted(taskIndex) {
    this.taskDeletedEvent.emit(taskIndex);
  }
}
