import {Component, Input} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {Flight} from "../../flight";
import {PackageService} from "../../package.service";
import {Hotel} from "../../hotel";
import {MatButton} from "@angular/material/button";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-flight',
  standalone: true,
  templateUrl: './flight.component.html',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatHint,
    MatStartDate,
    MatDatepickerModule,
    MatFormFieldModule,
    MatEndDate,
    MatButton
  ],
  styleUrl: './flight.component.css'
})
export class FlightComponent {

  @Input() packageName!: string;

  nameForm = new FormGroup({
    name : new FormControl<string|null>("Air Canada Flight 721")
  })
  priceForm = new FormGroup({
    price : new FormControl<number|null>(1000)
  })

  departureLocationForm = new FormGroup({
    departureLocation : new FormControl<string|null>("Montreal")
  })
  arrivalLocationForm = new FormGroup({
    arrivalLocation : new FormControl<string|null>("Athens")
  })
    travelDatesForm = new FormGroup({
    arrival: new FormControl(new Date(year, month, 13)),
    departure: new FormControl(new Date(year, month, 16)),
  });
  constructor(private packageService : PackageService) {
  }
  getDescription(){
    return ""
  }
  getFlight(): Flight{
    return {name : this.nameForm.get('name')?.getRawValue(),
            arrival_time : this.travelDatesForm.get('arrival')?.getRawValue().toString(),
            departure_time :  this.travelDatesForm.get('departure')?.getRawValue().toString(),
            arrival_location : this.arrivalLocationForm.get('arrivalLocation')?.getRawValue(),
            departure_location : this.departureLocationForm.get('departureLocation')?.getRawValue(),
    }
  }
  confirmFlight(){
    this.packageService.addFlight(this.packageName)
  }
}
