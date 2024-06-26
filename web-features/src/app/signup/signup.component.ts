import {Component, HostListener} from '@angular/core';
import {PackageService} from "../package.service";
import {Router, RouterLink} from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private packageService : PackageService,private router: Router) {
  }
  async signUp() {
    let username = (<HTMLInputElement>document.getElementById("username")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let pass1 = (<HTMLInputElement>document.getElementById("password1")).value;
    let pass2 = (<HTMLInputElement>document.getElementById("password2")).value;

    if(username === "" || email === "" || pass1 === "" || pass2 === ""){
      alert('Missing registration parameters')

    }
    else if (pass1 != pass2) {
      alert("Passwords do not match!");
    }
    else {
      this.packageService.signup(username, email, pass1, pass2)
      this.router.navigate(['login'])
    }
  }
}
