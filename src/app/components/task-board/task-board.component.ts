import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html'
})
export class TaskBoardComponent implements OnInit {

  // Title
  toDo = 'To Do';
  inProgress = 'In Progress';
  done = 'Done';

  // Count
  toDoCount: number = 0;
  inProgressCount: number = 0;
  doneCount: number = 0;

  constructor(private tasksService : TasksService) {}

  ngOnInit(): void {
    this.updateCounts();

    setInterval(() => {
      this.updateCounts();
    }, 0);
  }

  updateCounts() {
    this.toDoCount = this.tasksService.getTodoList().length;
    this.inProgressCount = this.tasksService.getProgressList().length;
    this.doneCount = this.tasksService.getDoneList().length;
  }

}
