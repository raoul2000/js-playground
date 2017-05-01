import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../../service/models.service';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  /**
   * task created by the form
   */
  task: TaskModel = new TaskModel("", false);
  /**
   * Used for Initialisation and reset after submition
   */
  @Input() defaultTask: TaskModel;

  @Output() taskCreatedEvent = new EventEmitter<TaskModel>();
  constructor() { }

  ngOnInit() {
  }

  /**
   * Add a task to the current todo list.
   * @param  {TaskModel} task task to add
   */
  addTask(taskForm) {
    console.log("submitted");
    console.log(taskForm);
    this.taskCreatedEvent.emit(this.task);
    this.task = new TaskModel(
      this.defaultTask.description,
      this.defaultTask.completed
    );
  }
}
