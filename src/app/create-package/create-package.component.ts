import {Component} from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatOption, provideNativeDateAdapter, ThemePalette} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelect} from "@angular/material/select";
import {MatInput, MatInputModule} from "@angular/material/input";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCheckbox} from "@angular/material/checkbox";
import {open} from "fs";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-create-package',
  standalone: true,
    providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule,
    MatOption, MatSelect, MatInput, MatInputModule, TopBarComponent, MatButton, RouterLink, MatCheckbox
  ],
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.css'
})

export class CreatePackageComponent {

  country = new FormControl('');
  title = new FormControl('');
  price = new FormControl('');

    travel_datas = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  createPackage(){

  }
  protected readonly open = open;
}
