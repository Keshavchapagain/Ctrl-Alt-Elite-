import {Component, inject, OnInit} from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {TravelPackageComponent} from "../travel-package/travel-package/travel-package.component";
import {RouterLink} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";

import {AsyncPipe, NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {Package, PackageArray} from "../package";
import {PackageService} from "../package.service";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";


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

  currentlySearchedPackage = ''
  packages :PackageArray = []
  searchForm = new FormGroup({
    search : new FormControl<string|null>(null)
  })
  constructor(private packageService : PackageService) {

  }
  packageAt(i : number) {

    return {
        component:TravelPackageComponent,inputs:{
          hotel : this.packages.at(i)?.hotel,
          _package : this.packages.at(i)?._package,
          flight : this.packages.at(i)?.flight
        }
    }
  }
  getPackages(){
    this.packageService.getPackagesAPI().subscribe({
      next: (data) =>{
        this.packages = data
        console.log(data)
      }
    })
  }

  isVisible(_package : Package): boolean{
    let query = this.searchForm.get('search')?.getRawValue()
    console.log(query)
    if(query == null || query == ''){
      return true;
    }
    return _package.hotel.name == query
  }
  onSearch(query : string){
    this.currentlySearchedPackage = query
    console.log(this.currentlySearchedPackage)
  }
  ngOnInit(): void {
    this.getPackages()
  }

}
