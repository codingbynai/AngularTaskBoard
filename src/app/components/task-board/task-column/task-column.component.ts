import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css']
})
export class TaskColumnComponent implements OnInit {

  ngOnInit(): void {
  }
  
  @Input() title: string = '';
 
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  progress = ['Skin care', 'Study', 'Work out'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  tasks: string[] = [];

  i = 0

  getConnectedListIds(): string[] {
    return ['cdk-drop-list-0', 'cdk-drop-list-1', 'cdk-drop-list-2'];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  
  titleColor(): string {
    switch (this.title) {
      case 'To Do':
        return 'yellow-title';
      case 'In Progress':
        return 'blue-title';
      case 'Done':
        return 'green-title';
      default:
        return '';
    }
  }

  bgColor(): string {
    switch (this.title) {
      case 'To Do':
        return 'yellow-bg';
      case 'In Progress':
        return 'blue-bg';
      case 'Done':
        return 'green-bg';
      default:
        return '';
    }
  }

  taskList(): string[] {
    switch (this.title) {
      case 'To Do':
        this.i = 0
        return this.tasks = this.todo;
      case 'In Progress':
        this.i = 1
        return this.tasks = this.progress;
      case 'Done':
        this.i = 2
        return this.tasks = this.done ;
      default:
        return this.tasks = [];
    }
  }
}
