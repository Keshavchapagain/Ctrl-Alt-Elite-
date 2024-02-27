import { Component,Input } from '@angular/core';
import { CommonModule } from "@angular/common";

import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input() rating: number;
  constructor() {
    this.rating=2.5
  }
  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }
}
