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
import {PackageService} from "../package.service";
import {HotelComponent} from "../travel-package/hotel/hotel.component";
import {FlightComponent} from "../travel-package/flight/flight.component";
import {Package} from "../package";
import {NgComponentOutlet, NgForOf, NgIf} from "@angular/common";
import {Flight} from "../flight";
import {Hotel} from "../hotel";
import {PackageDetailsComponent} from "../travel-package/package-details/package-details.component";
import {PackageDetails} from "../packageDetails";

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
    NgComponentOutlet, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule,
    MatOption, MatSelect, MatInput, MatInputModule, TopBarComponent, MatButton, RouterLink, MatCheckbox, HotelComponent, FlightComponent, NgComponentOutlet, NgForOf, PackageDetailsComponent, NgIf

  ],
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.css'
})

export class CreatePackageComponent {
  hotelVisible : boolean = false
  flightVisible : boolean = false
  addPackageOptionsVisible : boolean = false
  packageDetailsVisible : boolean = false

  packageNameForm = new FormGroup({
    packageName: new FormControl<string|null>('')
  })
  getPackageName(){
      return this.packageNameForm.get('packageName')?.getRawValue()
  }
  constructor(private packageService : PackageService) {
  }
  addHotel(){
    this.hotelVisible = true
  }
  createPackage(){
    let name = this.getPackageName()
    if(name === ""){
      alert("Cannot have empty package name!")
    }
    else {
      console.log(`Creating package ${name}`)
      this.packageService.createBasePackage(name)
      this.addPackageOptionsVisible = true
    }
  }
  addFlight() {
    this.flightVisible = true
  }
  addDetails(){
    this.packageDetailsVisible = true
  }
}
