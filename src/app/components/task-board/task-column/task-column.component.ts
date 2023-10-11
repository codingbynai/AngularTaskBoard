import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css']
})
export class TaskColumnComponent implements AfterViewInit {

  @Input() title: string = '';
  @Input() count: number = 0;
  @ViewChild('inputField') inputField!: ElementRef;
 
  todoList      : string[] = [];
  progressList  : string[] = [];
  doneList      : string[] = [];
  tasks         : string[] = [];

  i                 : number = 0;
  showInput         : boolean = false
  newTask           : string = ''
  editingTaskIndex  : number = -1;

  constructor ( private tasksService: TasksService) {
    this.todoList      = this.tasksService.getTodoList();
    this.progressList  = this.tasksService.getProgressList();
    this.doneList      = this.tasksService.getDoneList();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showInput = this.showInput;
    });
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

  addNewTask() {
    if (this.showInput) {
      if (this.newTask.trim() !== '') {
        switch (this.i) {
          case 0:
            this.todoList.push(this.newTask);
            break;
          case 1:
            this.progressList.push(this.newTask);
            break;
          case 2:
            this.doneList.push(this.newTask);
            break;
          default:
            break;
        }
      }
      this.newTask = '';
    }
    setTimeout(() => {
      this.showInput = !this.showInput;
      if (this.showInput) {
        setTimeout(() => {
          this.inputField.nativeElement.focus();
          this.showInput = this.showInput;
        });
      }
    });
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
  }

  editTask(index: number) {
    this.editingTaskIndex = index;
  }

  // updateTask(newValue: any, index: number) {
  //   const newTaskValue = newValue;
  //   if (this.editingTaskIndex >= 0) {
  //     if (index >= 0 && index < this.todoList.length) {
  //       this.todoList[index] = newTaskValue;
  //     } else if (index >= 0 && index < this.progressList.length) {
  //       this.progressList[index] = newTaskValue;
  //     } else if (index >= 0 && index < this.doneList.length) {
  //       this.doneList[index] = newTaskValue;
  //     }
  //   }
  //   this.cancelEdit();
  // }

  updateTask(newValue: any, index: number) {
    const newTaskValue = newValue;
    if (this.editingTaskIndex >= 0) {
      switch (this.title) {
        case 'To Do':
          this.tasksService.updateTodoItem(index, newTaskValue);
          break;
        case 'In Progress':
          this.tasksService.updateProgressItem(index, newTaskValue);
          break;
        case 'Done':
          this.tasksService.updateDoneItem(index, newTaskValue);
          break;
        default:
          break;
      }
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.editingTaskIndex = -1;
  }

}
