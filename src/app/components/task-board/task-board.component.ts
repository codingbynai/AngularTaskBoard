import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html'
})
export class TaskBoardComponent {
  toDo = 'To Do';
  inProgress = 'In Progress';
  done = 'Done';
}
