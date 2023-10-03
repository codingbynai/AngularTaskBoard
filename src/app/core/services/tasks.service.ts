import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
    
    // Tasks List
    todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
    progress = ['Skin care', 'Study', 'Work out'];
    done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
    
    constructor() { }
    
    // Get List
    getTodoList(): string[] {
      return this.todo;
    }
    
    getProgressList(): string[] {
      return this.progress;
    }
    
    getDoneList(): string[] {
      return this.done;
    }
    
    // Add Item
    addTodoItem(item: string): void {
      this.todo.push(item);
    }
    
    addProgressItem(item: string): void {
      this.progress.push(item);
    }
    
    addDoneItem(item: string): void {
      this.done.push(item);
    }
    
    // Delete Item
    deleteTodoItem(index: number): void {
      this.todo.splice(index, 1);
    }
    
    deleteProgressItem(index: number): void {
      this.progress.splice(index, 1);
    }
    
    deleteDoneItem(index: number): void {
      this.done.splice(index, 1);
    }

    // UpdateList
    updateLists(todoList: string[], progressList: string[], doneList: string[]) {
      this.todo = todoList;
      this.progress = progressList;
      this.done = doneList;
    }
}
