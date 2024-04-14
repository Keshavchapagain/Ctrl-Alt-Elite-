import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreatePackageComponent} from "./create-package/create-package.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {ModifyPackageComponent} from "./modify-package/modify-package.component";
export const routes: Routes = [
  {path : '', component : DashboardComponent},
  {path : 'createPackage', component : CreatePackageComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'home', component : HomeComponent},
  {path : 'signup',component : SignupComponent},
  {path : 'login', component : LoginComponent},
  {path : 'modifyPackage', component : ModifyPackageComponent}
];
