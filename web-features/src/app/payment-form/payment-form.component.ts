import { Component, inject, signal, ViewChild } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import {
  injectStripe, NgxStripeModule, StripeCardExpiryComponent, StripeCardNumberComponent, StripeElementsDirective,
  StripePaymentElementComponent
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    StripePaymentElementComponent,
    StripeElementsDirective,
    StripeCardNumberComponent,
    StripeCardExpiryComponent
  ]
})

export class PaymentFormComponent {
  // @ViewChild(StripePaymentElementComponent)
  // paymentElement!: StripePaymentElementComponent;
  //
  // private readonly fb = inject(UntypedFormBuilder);
  //
  // paymentElementForm = this.fb.group({
  //   name: ['John Doe', [Validators.required]],
  //   email: ['support@ngx-stripe.dev', [Validators.required]],
  //   address: [''],
  //   zipcode: [''],
  //   city: [''],
  //   amount: [2500, [Validators.required, Validators.pattern(/\d+/)]]
  // });
  //
  // elementsOptions: StripeElementsOptions = {
  //   locale: 'en',
  //   clientSecret: environment.stripe.secretKey,
  //   appearance: {
  //     theme: 'flat'
  //   }
  // };
  // public cardOptions: StripeCardElementOptions = {
  //   style: {
  //     base: {
  //       fontWeight: 400,
  //       fontFamily: 'Circular',
  //       fontSize: '14px',
  //       iconColor: '#666EE8',
  //       color: '#002333',
  //       '::placeholder': {
  //         color: '#919191',
  //       },
  //     },
  //   },
  // };
  //
  // paymentElementOptions: StripePaymentElementOptions = {
  //   layout: {
  //     type: 'tabs',
  //     defaultCollapsed: false,
  //     radios: false,
  //     spacedAccordionItems: false
  //   }
  // };
  //
  // // Replace with your own public key
  // stripe = injectStripe(environment.stripe.publicKey);
  // paying = signal(false);
  //
  // pay() {
  //   if (this.paying() || this.paymentElementForm.invalid) return;
  //   this.paying.set(true);
  //
  //   const {
  //     name,
  //     email,
  //     address,
  //     zipcode,
  //     city
  //   } = this.paymentElementForm.getRawValue();
  //
  //   this.stripe
  //     .confirmPayment({
  //       elements: this.paymentElement.elements,
  //       confirmParams: {
  //         payment_method_data: {
  //           billing_details: {
  //             name: name as string,
  //             email: email as string,
  //             address: {
  //               line1: address as string,
  //               postal_code: zipcode as string,
  //               city: city as string
  //             }
  //           }
  //         }
  //       },
  //       redirect: 'if_required'
  //     })
  //     .subscribe(result => {
  //       this.paying.set(false);
  //       if (result.error) {
  //         // Show error to your customer (e.g., insufficient funds)
  //         alert({ success: false, error: result.error.message });
  //       } else {
  //         // The payment has been processed!
  //         if (result.paymentIntent.status === 'succeeded') {
  //           // Show a success message to your customer
  //           alert({ success: true });
  //         }
  //       }
  //     });
  // }
}
