import { Component, OnInit } from '@angular/core';
import { TodolistModel } from '../../service/models.service';
import { TodolistService } from '../../service/todolist.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  showForm:boolean = false;
  todolists : Array<TodolistModel>;
  todolistForm: FormGroup;
  listNameCtrl: FormControl;

  constructor(
    private service: TodolistService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.listNameCtrl = fb.control('', [ListViewComponent.myCustomValidator,  Validators.required, Validators.minLength(3)]);
    this.todolistForm = fb.group({
      listName : this.listNameCtrl
    });
  }

  ngOnInit() {
    this.service.list().subscribe(x => this.todolists = x);
  }

  viewTodolist(list:TodolistModel) {
    console.log(list);
    this.router.navigate(['/todo', list.title]);
  }
  createTodolist() {

  }
  submitNewTodolist() {
    console.log(this.todolistForm.value);
  }
  static myCustomValidator(control: FormControl) {
    return control.value !== "nothing" ? null : { tooLazy : true };
  }
}
