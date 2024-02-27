import { Component } from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {TravelPackageComponent} from "../travel-package/travel-package/travel-package.component";
import {RouterLink} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TopBarComponent,
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatButton,
    TravelPackageComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
