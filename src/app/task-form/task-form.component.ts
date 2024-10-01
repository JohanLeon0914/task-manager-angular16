import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      people: this.fb.array([]),
      completed: [false]
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: [null, [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('')]) 
    });
  
    this.people.push(personForm);
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  addSkill(personIndex: number) {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.push(this.fb.control(''));
  }
  
  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.removeAt(skillIndex);
  }
  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }
  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.taskForm.reset();
    }
  }
}