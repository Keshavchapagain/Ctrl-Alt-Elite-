import {Component, inject, Inject, Input, signal, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {injectStripe, StripeElementsDirective, StripePaymentElementComponent} from "ngx-stripe";
import {
  Appearance,
  StripeCardElementOptions,
  StripeElementsOptions,
  StripePaymentElementOptions
} from "@stripe/stripe-js";
import {environment} from "../environments/environment";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDivider} from "@angular/material/divider";
import {MatLabel} from "@angular/material/form-field";
import {PackageService} from "../package.service";


export interface BookingDetails {
  name: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatInput,
    MatDialogActions,
    MatButton,
    FormsModule,
    MatFormField,
    ReactiveFormsModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
    MatLabel,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    MatToolbar,
    MatCardContent,
    MatDivider
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})

export class BookingComponent {
  constructor(private backendService : PackageService,
              public dialogRef: MatDialogRef<BookingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BookingDetails) {}

  openPaymentForm(){
    // this.router.
  }
  @Input() packageName!: string;

  onNoClick(): void {
    this.dialogRef.close();
  }
   @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(UntypedFormBuilder);

  paymentElementForm = this.fb.group({
    name: ['Nikolas Darlas', [Validators.required]],
    email: ['nikolas.darlas@gmail.com', [Validators.required]],
    address: ['[Address]'],
    zipcode: ['[Zip Code]'],
    city: ['[City]'],
    amount: [2500, [Validators.required, Validators.pattern(/\d+/)]]
  });
  appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#673ab7',
    },
  };
  paying = signal(false);
  async pay(){
    let firstName = this.paymentElementForm.get('name')?.getRawValue().split(' ')[0]
    let lastName = this.paymentElementForm.get('name')?.getRawValue().split(' ')[1]
    let email = this.paymentElementForm.get('email')?.getRawValue()

    this.backendService.addBooking(firstName,lastName,email,this.packageName)

    // this.paying.set(true)
    // await this.delay(3000);
    // this.paying.set(false)
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

   clear() {
    this.paymentElementForm.patchValue({
      name: '',
      email: '',
      address: '',
      zipcode: '',
      city: '',
    });
  }
}
