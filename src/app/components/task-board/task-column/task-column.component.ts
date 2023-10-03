import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css']
})
export class TaskColumnComponent implements OnChanges  {

  @Input() title: string = '';
  @Input() count: number = 0;
  @ViewChild('countElement', { static: false }) countElement!: ElementRef;
 
  todoList      : string[] = [];
  progressList  : string[] = [];
  doneList      : string[] = [];
  tasks         : string[] = [];

  i     : number = 0;
  //count : number = 0;


  constructor ( private tasksService: TasksService,
                private changeDetectorRef: ChangeDetectorRef) {
    this.todoList      = this.tasksService.getTodoList();
    this.progressList  = this.tasksService.getProgressList();
    this.doneList      = this.tasksService.getDoneList();
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['title']) {
    //   this.updateCount();
    // }
  }
  
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
        event.currentIndex
      );
      
      this.tasksService.updateLists(
        this.tasksService.getTodoList(),
        this.tasksService.getProgressList(),
        this.tasksService.getDoneList()
      );
  
      
      this.todoList = this.tasksService.getTodoList();
      this.progressList = this.tasksService.getProgressList();
      this.doneList = this.tasksService.getDoneList();
      console.log(this.todoList);
      console.log(this.progressList);
      this.changeDetectorRef.detectChanges();

      // this.updateCount();
    }
  }
  

  getListByContainerId(containerId: string): string[] {
    switch (containerId) {
      case 'cdk-drop-list-0':
        return this.todoList;
      case 'cdk-drop-list-1':
        return this.progressList;
      case 'cdk-drop-list-2':
        return this.doneList;
      default:
        return [];
    }
  }

  // updateCount() {
  //   switch (this.title) {
  //     case 'To Do':
  //       this.count = this.todoList.length;
  //       break;
  //     case 'In Progress':
  //       this.count = this.progressList.length;
  //       break;
  //     case 'Done':
  //       this.count = this.doneList.length;
  //       break;
  //     default:
  //       this.count = 0;
  //       break;
  //   }
    
  //   if (this.countElement && this.countElement.nativeElement) {
  //     this.countElement.nativeElement.textContent = this.count;
  //   }
  // }
  
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
        return this.todoList;
      case 'In Progress':
        this.i = 1
        return this.progressList;
      case 'Done':
        this.i = 2
        return this.doneList;
      default:
        return [];
    }
  }

  delete(index: number) {
    switch (this.title) {
      case 'To Do':
        this.tasksService.deleteTodoItem(index);
        this.todoList = this.tasksService.getTodoList();
        break;
      case 'In Progress':
        this.tasksService.deleteProgressItem(index);
        this.progressList = this.tasksService.getProgressList();
        break;
      case 'Done':
        this.tasksService.deleteDoneItem(index);
        this.doneList = this.tasksService.getDoneList();
        break;
      default:
        break;
    }
  
    // this.updateCount();
  }
}
