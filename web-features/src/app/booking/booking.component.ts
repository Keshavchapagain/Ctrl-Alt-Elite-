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
import {StripeCardElementOptions, StripeElementsOptions, StripePaymentElementOptions} from "@stripe/stripe-js";
import {environment} from "../environments/environment";


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
        StripePaymentElementComponent
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
    name: ['John Doe', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/\d+/)]]
  });

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

  pay() {
    if (this.paying() || this.paymentElementForm.invalid) return;
    this.paying.set(true);

    const {
      name,
      email,
      address,
      zipcode,
      city
    } = this.paymentElementForm.getRawValue();
    console.log(name)

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string
              }
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
  }
}
