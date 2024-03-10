import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {TravelPackageComponent} from "./travel-package/travel-package/travel-package.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreatePackageComponent} from "./create-package/create-package.component";

export const routes: Routes = [
  {path : '', component : DashboardComponent},
  {path : 'createPackage', component : CreatePackageComponent}
];
