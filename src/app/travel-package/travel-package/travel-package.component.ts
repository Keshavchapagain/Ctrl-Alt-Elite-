import {Component, OnInit} from '@angular/core';
import {FlightComponent} from "../flight/flight.component";
import {HotelComponent} from "../hotel/hotel.component";
import {NgOptimizedImage} from "@angular/common";
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";

@Component({
  selector: 'app-travel-package',
  standalone: true,
  imports: [
    FlightComponent,
    HotelComponent,
    NgOptimizedImage,
    StarRatingComponent,
    MatButton,
    MatFabButton,
    MatChipListbox,
    MatChipOption,
  ],
  templateUrl: './travel-package.component.html',
  styleUrl: './travel-package.component.css'
})
export class TravelPackageComponent implements OnInit{

    ngOnInit() {
    }

  readPackagesFromJsonFiles(){

    }
}
