import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreatePackageComponent} from "./create-package/create-package.component";
import {PaymentFormComponent} from "./payment-form/payment-form.component";
export const routes: Routes = [
  {path : '', component : DashboardComponent},
  {path : 'createPackage', component : CreatePackageComponent},
  {path : 'pay', component : PaymentFormComponent}
];
