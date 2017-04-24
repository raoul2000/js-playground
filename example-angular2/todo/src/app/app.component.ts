import { Component, OnInit } from '@angular/core';
import { TaskModel } from './service/models.service';

import { TodoService } from './service/todo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo List';
  task: TaskModel = new TaskModel("", false);

  todos: Array<TaskModel> = [];

  constructor(private service:TodoService) {}

  getCompletedCount():number {
    let count:number = 0;
    for (let i = 0; i < this.todos.length; i++) {
      if( this.todos[i].completed === true) {
        count++;
      }
    }
    return count;
  }
  
  ngOnInit() {
    this.todos = this.service.list();
  }

  deleteTask(taskIndex) {
    console.log("delete task index : " + taskIndex);
    let ar: Array<TaskModel> = [];
    for (let i = 0; i < this.todos.length; i++) {
      if (i !== taskIndex) {
        ar.push(this.todos[i]);
      }
    }
    this.todos = ar;
  }

  deleteCompletedTask() {
    this.todos = this.todos.filter( task => ! task.completed);
  }
  /**
   * Add a task to the current todo list.
   * @param  {TaskModel} task task to add
   */
  addTask(task) {
    console.log("add task : ");
    console.log(this.task);
    this.todos.push(this.task);
    this.task = new TaskModel("", false);
  }

  toggleTaskComplete(task: TaskModel) {
    console.log(task.description);
    task.completed = !task.completed;
  }
}
