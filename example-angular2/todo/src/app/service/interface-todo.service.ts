import { TaskModel, TodolistModel } from './models.service';
import {Observable } from 'rxjs/Observable';

export interface ITodoService {
  /**
   * Returns a list of all tasks for a given todo-list title
   * @param  {string}           title the title identifying the todo-list
   * @return {Array<TaskModel>}       collection of task todo
   */
  //listByTitle(title: string):Array<TaskModel>;
  createTask(task: TaskModel);
  updateTask(task: TaskModel);
  deleteTask(task: TaskModel);

  getTodosByListId(listId:number):Observable<TaskModel[]>;
}

export interface ITodolistService {
  /**
   * Returns a list of all todo lists
   * @return {Array<TodolistModel>} [description]
   */
  list():Array<TodolistModel>;


}
