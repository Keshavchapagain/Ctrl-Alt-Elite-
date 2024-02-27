import { Component } from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatIcon, RouterLink, MatButton],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  // onPackageSelect(){
  //   this.router.navigate(['/role']);
  // }
}
