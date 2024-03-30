import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {PackageDetails} from "../packageDetails";
import {PackageService} from "../package.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatInput,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.css'
})
export class PackageDetailsComponent {

  ratingForm = new FormGroup({
    rating: new FormControl<number|null>(0.0)
  })
  imagePathForm = new FormGroup({
    imagePath : new FormControl<string|null>("herodion.png")
  })
  countryForm = new FormGroup({
      country : new FormControl<string|null>("Greece")
  })
  totalPriceForm = new FormGroup({
    totalPrice : new FormControl<number|null>(2000.0)
  })
  amenitiesForm = new FormGroup({
    amenities : new FormControl<string|null>("Pool,Buffet,All-inclusive")
  })
    @Input() packageName!: string;

  constructor(private packageService : PackageService) {
  }
  getPackageDetails(): PackageDetails{
    return {
      country : this.countryForm.get('country')?.getRawValue(),
      price : this.totalPriceForm.get('totalPrice')?.getRawValue(),
      amenities : this.amenitiesForm.get('amenities')?.getRawValue(),
      image_path : this.imagePathForm.get('imagePath')?.getRawValue(),
      rating : this.ratingForm.get('rating')?.getRawValue()
    }
  }

  confirmPackageDetails(){
    this.amenitiesForm.disable()
    this.countryForm.disable()
    this.imagePathForm.disable()
    this.ratingForm.disable()
    this.totalPriceForm.disable()
    console.log(`Creating flight for ${this.packageName}`)

    this.packageService.addPackageDetails(this.packageName,this.getPackageDetails())
  }
}
