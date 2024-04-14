import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HotelComponent} from "../travel-package/hotel/hotel.component";
import {FlightComponent} from "../travel-package/flight/flight.component";
import {PackageDetailsComponent} from "../travel-package/package-details/package-details.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {TopBarComponent} from "../top-bar/top-bar.component";

@Component({
  selector: 'app-modify-package',
  standalone: true,
  imports: [
    HotelComponent,
    FlightComponent,
    PackageDetailsComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButton,
    TopBarComponent
  ],
  providers : [
    MatDatepickerModule
  ],
  templateUrl: './modify-package.component.html',
  styleUrl: './modify-package.component.css'
})
export class ModifyPackageComponent implements OnInit{
  packageName : string = "adasdsa"

  constructor(router : Router) {
  }
    private route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.packageName = String(this.route.snapshot.paramMap.get('packageName'));
  }
  confirm(){

  }

}
