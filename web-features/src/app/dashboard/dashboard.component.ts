import {Component, inject, OnInit} from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {TravelPackageComponent} from "../travel-package/travel-package/travel-package.component";
import {Router, RouterLink} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";

import {AsyncPipe, NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {Package, PackageArray} from "../package";
import {PackageService} from "../package.service";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Booking, BookingArray} from "../booking";


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
    RouterLink,
    NgComponentOutlet,
    NgForOf,
    MatInput,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  // Arrays to hold all the packages and bookings for a client
  packages : PackageArray = []
  bookings : BookingArray = []

  searchForm = new FormGroup({
    search : new FormControl<string|null>(null)
  })

  user : string = ""
  constructor(private backendService : PackageService,private router: Router) {
    // localStorage.setItem("currentUser","hi")
    this.user = localStorage.getItem('currentUser')!!
    if(this.user == null){
      this.router.navigate(['login'])
    }
    console.log('Current user :',this.user)
  }

  /*
    Get a package from the list of packages
   */
  packageAt(i : number) {
    return {
        component:TravelPackageComponent,inputs:{
          name : this.packages.at(i)?.name,
          hotel : this.packages.at(i)?.hotel,
          _package : this.packages.at(i)?._package,
          flight : this.packages.at(i)?.flight,
          booking : this.packages.at(i)?.booking
        }
    }
  }
  /*
    Get the all packages from the backend.
   */
  getPackages(){
    this.backendService.getPackagesAPI().subscribe({
      next: (data) =>{
        this.packages = data
        // Putting this here ensures that it will get called after the packages have been obtained.
        this.getBookings()
        console.log(data)
      }
    })
  }

  async getBookings(){
    this.backendService.getBookings().subscribe({
      next: (data) =>{
        this.bookings = data
        console.log(this.bookings)
        for(let i = 0 ; i < this.bookings.length ; i++){

          // Get the ID of the package that is associated with this booking

          let packageID = this.bookings.at(i)?.package
          if(packageID != null){
          // Get the package that is booked for the current booking
            let bookedPackage = this.packages.filter(function (value){
              return (value.id == packageID)
          })
          // Set the booking information for the booked package
          bookedPackage[0].booking = this.bookings.at(i)!!
        }
      }
    }})
  }

  /*
    Searching is done by finding the package such that the name matches what was entered in the search form.
    When this element is found, it will return a boolean to specify that it should be visible. Thus, searching is done
    by finding the only element that should be visible.
   */
  isVisible(_package : Package): boolean{
    let query = this.searchForm.get('search')?.getRawValue()
    console.log(query)
    if(query == null || query == ''){
      return true;
    }
    return _package.name == query
  }

  ngOnInit(): void {
    this.getPackages()
  }
}
