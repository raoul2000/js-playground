import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskModel } from '../../service/models.service';

import { TodoService } from '../../service/todo.service';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {
  title = 'Todo List';
  todos: Array<TaskModel> = [];
  /**
   * Initialisation value for task description.
   * This is empty string on init and on successfull task creation.
   * On task creation failure because of duplicate description, the user Input
   * description remains in the input field.
   */
  defaultTask: TaskModel = new TaskModel("", false);

  constructor(
    private service: TodoService,
    private route: ActivatedRoute,
    private pageTitle: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('listTitle');
    this.todos = this.service.listByTitle(this.title);
    this.updatePageTitle();
    this.meta.addTag( { name : 'author', content : 'raoul2000'});
  }

  updatePageTitle() {
    this.pageTitle.setTitle(`${this.todos.length - this.getCompletedCount()} todo(s)`);
  }

  getCompletedCount(): number {
    let count: number = 0;
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].completed === true) {
        count++;
      }
    }
    return count;
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  deleteTask(taskIndex) {
    console.log("delete task index : " + taskIndex);
    this.service.deleteTask(this.todos[taskIndex]);

    let ar: Array<TaskModel> = [];
    for (let i = 0; i < this.todos.length; i++) {
      if (i !== taskIndex) {
        ar.push(this.todos[i]);
      }
    }
    this.todos = ar;
    this.updatePageTitle();
  }
  /**
   * Batch deletion of all tasks marked as COMPLETED
   */
  deleteAllCompletedTask() {
    
    this.todos = this.todos.filter(task => !task.completed);
    this.updatePageTitle();
  }
  /**
   * Add a task to the current todo list.
   * @param  {TaskModel} task task to add
   */
  createTask(task: TaskModel) {
    if(this.todos.find((item) => item.description === task.description)) {
      alert('you already have this one in your Todo list !');
      this.defaultTask.description = task.description;
    } else {
      this.service.createTask(task);
      this.todos.push(task);
      this.defaultTask.description = "";
      this.updatePageTitle();
    }
  }

  toggleTaskComplete(task: TaskModel) {
    console.log(task.description);
    task.completed = !task.completed;
    this.updatePageTitle();
  }
}
