import { Component } from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatIcon, RouterLink, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  user = localStorage.getItem('currentUser')

}
