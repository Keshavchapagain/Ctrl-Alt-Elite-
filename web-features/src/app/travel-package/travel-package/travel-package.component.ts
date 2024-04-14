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
import {Router, RouterLink} from "@angular/router";
import {Booking} from "../../booking";

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
    RouterLink,

  ],
  templateUrl: './travel-package.component.html',
  styleUrl: './travel-package.component.css'
})
export class TravelPackageComponent implements OnInit {
  @Input() name!: string;
  @Input() hotel!: Hotel;
  @Input() flight!: Flight;
  @Input() _package!: PackageDetails;
  // @Input() booked!: boolean;
  @Input() booking: Booking | null = null

  // booked = signal(false);
  // visible : boolean = true;

  constructor(public dialog: MatDialog,private router: Router,private backendService : PackageService) {

  }
  amenitiesList: string[] = [];
  ngOnInit() {
    // The ameitites are commma seperated (Sauna,Pool,etc.)
    this.amenitiesList = this._package.amenities.split(",")
  }
  // Booking a package involves opening a dialog
  bookPackage(): void {
    const dialogRef = this.dialog.open(BookingComponent, {
      width: '700px',
      height: '500px',
      data: {name: "Name"}
    });
    // Give the booking component the name for this package
   let instance = dialogRef.componentInstance
    instance.packageName = this.name
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
  modifyPackage(){
    this.router.navigate(['modifyPackage',{packageName : this.name}])
  }
  modifyBooking(){

  }
  cancelBooking(){
    this.backendService.deleteBooking(this.booking!!.id)
  }
  deletePackage(){
    this.backendService.deletePackage(this.name)
    // window.location.reload()
  }

}
