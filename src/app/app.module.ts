import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {NgFor} from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskColumnComponent } from './components/task-board/task-column/task-column.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskBoardComponent,
    TaskColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkDropList, 
    NgFor, 
    CdkDrag
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
