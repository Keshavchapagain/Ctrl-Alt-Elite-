import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Hotel} from "../../hotel";
import {PackageService} from "../../package.service";
import {MatButton} from "@angular/material/button";


interface RoomType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-hotel',
  standalone: true,
  // imports: [],
  templateUrl: './hotel.component.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatOption,
    MatInputModule,
    MatSelect,
    MatButton
  ],
  styleUrl: './hotel.component.css'
})

export class HotelComponent {
  @Input() packageName!: string;

  roomTypes : RoomType[] = [
    {value: 'SINGLE', viewValue : "Single bed"},
    {value: 'DOUBLE', viewValue : "Double bed"},
  ]
  nameForm = new FormGroup({
    name : new FormControl<string|null>("Herodion Hotel")
  })
  addressForm = new FormGroup({
    address : new FormControl<string|null>("Rovertou Galli 4, Athina 117 42, Greece")
  })
  priceForm = new FormGroup({
    price : new FormControl<number|null>(119)
  })
  descriptionForm = new FormGroup({
    description : new FormControl<string|null>("A 12-minute walk from the Parthenon and the renowned " +
      "Acropolis ruins, this fashionable hotel is a 13-minute walk from Erechtheion temple")
  })
   constructor(private packageService : PackageService) {
  }
  getHotel():Hotel{
    return {
      name : this.nameForm.get('name')?.getRawValue(),
      price : this.priceForm.get('price')?.getRawValue(),
      address : this.addressForm.get('address')?.getRawValue(),
      description: this.descriptionForm.get('description')?.getRawValue(),
      room_type : "Single"
    }
  }
  confirmHotel(){
    this.packageService.addHotel(this.packageName)
  }
}

