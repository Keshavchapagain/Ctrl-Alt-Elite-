import { Component } from '@angular/core';
import {PackageService} from "../package.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private backendService : PackageService,private router: Router) {
  }
  login(){
    let username = (<HTMLInputElement>document.getElementById("login_user")).value;
    let password = (<HTMLInputElement>document.getElementById("login_pass")).value;

    if(username === "" || password === "") {
      alert("Missing login parameters")
    }
    else {
      this.backendService.login(username, password)
      this.router.navigate([''])
    }

  }
}
