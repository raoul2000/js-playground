import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { TreeViewComponent } from './editor/tree-view/tree-view.component';
import { DetailViewComponent } from './editor/detail-view/detail-view.component';
import { EditorComponent } from './editor/editor.component';
import { ListComponent } from './list/list.component';
import { ScraperDataService } from './service/scraper-data';


@NgModule({
  declarations: [
    AppComponent,
    TreeViewComponent,
    DetailViewComponent,
    EditorComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ScraperDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
