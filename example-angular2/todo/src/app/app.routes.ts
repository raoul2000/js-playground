
import { Routes } from '@angular/router';
import { ListViewComponent } from './component/list-view/list-view.component';
import { TodoViewComponent } from './component/todo-view/todo-view.component';

export const ROUTES: Routes = [
  { path: 'home', component: ListViewComponent },
  { path: 'todo/:listId', component: TodoViewComponent },
  { path: '**', redirectTo : 'home'}
];
