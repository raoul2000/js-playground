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
  listId:number;
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
    // illustrate the use of the meta service : dynamically set the META tag of the page
    this.meta.addTag( { name : 'author', content : 'raoul2000'});

    // get the route param : the id of the todolist
    this.listId = parseInt(this.route.snapshot.paramMap.get('listId'));

    this.title = "";
    // get all the tasks that belong to the list
    this.service.getTodosByListId(this.listId)
      .subscribe( x => {
        this.todos = x
        this.updatePageTitle();
      });
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
      task.listId = this.listId;
      this.service.createTask(task)
      .subscribe(newTask => {
        console.log(newTask);
        this.todos.push(newTask);
        this.defaultTask.description = "";
        this.updatePageTitle();
      });
    }
  }

  toggleTaskComplete(taskIndex) {
    // TODO: understand why argTask is not cast automatically into a TaskModel object type. instead
    // it is a generic object with only properties. Calling a TaskModel methode raises an exception
    // This is why here we force the creation of a TaskModel object
    //let task = new TaskModel(argTask.description, argTask.completed, argTask.id);
    let ex = new TaskModel("descr",true);
    console.log(ex);

    let task = this.todos[taskIndex];
    task.completed = !task.completed;
    this.service.updateTask(task).subscribe(x => {
      this.updatePageTitle();
    });
  }
}
