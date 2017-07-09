import { Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ListComponent } from './list/list.component';


export const ROUTES: Routes = [
  { path: '', component: ListComponent },
  { path: 'editor', component: EditorComponent }
];
