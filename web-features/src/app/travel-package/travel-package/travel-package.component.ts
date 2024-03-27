import {Component, Input, OnInit, signal} from '@angular/core';
import {FlightComponent} from "../flight/flight.component";
import {HotelComponent} from "../hotel/hotel.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {PackageService} from "../../package.service";
import {Hotel} from "../../hotel";
import {PackageDetails} from "../../packageDetails";
import {Flight} from "../../flight";
import {BookingComponent} from "../../booking/booking.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-travel-package',
  standalone: true,
  imports: [
    FlightComponent,
    HotelComponent,
    NgOptimizedImage,
    MatButton,
    MatFabButton,
    MatChipListbox,
    MatChipOption,
    NgForOf,
    NgIf,

  ],
  templateUrl: './travel-package.component.html',
  styleUrl: './travel-package.component.css'
})
export class TravelPackageComponent implements OnInit {
  @Input() name!: string;
  @Input() hotel!: Hotel;
  @Input() flight!: Flight;
  @Input() _package!: PackageDetails;

   booked = signal(false);
  // visible : boolean = true;
  constructor(public dialog: MatDialog) {}
  amenitiesList: string[] = [];
  ngOnInit() {
    this.amenitiesList = this._package.amenities.split(",")
  }
  // Booking a package involves opening a dialog
  bookPackage(): void {
    const dialogRef = this.dialog.open(BookingComponent, {
      width: '400px',
      data: {name: "Name"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.booked.set(true)
    });
  }

  getRatingScore(){
    if(this._package.rating >= 9)
      return {rating_text : "Excellent", color : 0x00FF00}
    else if(this._package.rating >= 8 && this._package.rating < 9)
      return {rating_text : "Average", color : 0x00FF00}
    else if(this._package.rating >= 7 && this._package.rating < 8)
      return {rating_text : "Great", color : 0x00FF00}
    else
      return {rating_text : "Poor", color : 0xFF0000}
  }

}
