import {Component, inject, Inject, signal, ViewChild} from '@angular/core';
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
  constructor(
              public dialogRef: MatDialogRef<BookingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BookingDetails) {}

  openPaymentForm(){
    // this.router.
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
   @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(UntypedFormBuilder);

  paymentElementForm = this.fb.group({
    name: ['[Name]', [Validators.required]],
    email: ['[support@ngx-stripe.dev]', [Validators.required]],
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
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    clientSecret: `12_secret_${environment.stripe.secretKey}`,

    appearance: {
      theme: 'flat'
    }
  };
  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontWeight: 400,
        fontFamily: 'Circular',
        fontSize: '14px',
        iconColor: '#666EE8',
        color: '#002333',
        '::placeholder': {
          color: '#919191',
        },
      },
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  // Replace with your own public key
  stripe = injectStripe(environment.stripe.publicKey);
  paying = signal(false);
  async pay(){
    this.paying.set(true)
    await this.delay(3000);
    this.paying.set(false)
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
