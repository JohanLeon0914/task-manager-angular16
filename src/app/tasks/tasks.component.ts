import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  filter = 'all'; // all, completed, pending

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  filterTasks() {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
  }
}