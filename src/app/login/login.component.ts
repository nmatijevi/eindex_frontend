import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Authority } from '../constants/authority.constants';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { JwtToken } from './jwt-token.model';
import { LoginService } from './login.service';
import { UserCredentials } from './user-credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticating = false; // to show loading
  loginFailed = false; // to show login failed message

  userCredentials!: UserCredentials;
  private loggedIn = new BehaviorSubject<boolean>(localStorage.getItem("isLoggedIn") === "true");


  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userCredentials = new UserCredentials();
    // provjeriti da li je vec ulogiran
    
  }


  login() {
    this.authenticating = true;
    this.loginFailed = false;

    this.loginService.authenticate(this.userCredentials).subscribe(
      (jwtToken: JwtToken) => this.successfulLogin(jwtToken),
      () => this.loginFailed = true
    ).add(() => this.authenticating = false);
  }

  successfulLogin(jwtToken: JwtToken) {
    localStorage.setItem('token', jwtToken.token); // store token value to localstorage
    this.userService.getCurrentUser().subscribe((currentUser: User) => this.userService.currentUser = currentUser);
    this.router.navigate(['/home']);
  }
  isUserLoggedIn(): boolean {
    return !this.userService.currentUser;
  }
}
