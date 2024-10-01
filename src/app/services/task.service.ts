import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  getTasks() {
    return this.tasksSubject.value;
  }

  addTask(task: Task) {
    const tasks = this.tasksSubject.value;
    this.tasksSubject.next([...tasks, task]);
  }

  updateTask(updatedTask: Task) {
    const tasks = this.tasksSubject.value.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(tasks);
  }
}