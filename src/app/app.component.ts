import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import {PopUpComponent} from "./pop-up/pop-up.component";
import { User } from './user/user.model';
import { UserService } from './user/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-index';
  currentLanguage!: string;

  constructor(public userService: UserService, private loginService: LoginService, private router: Router, private translateService: TranslateService) { }
  ngOnInit(): void{
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });
    if (this.translateService.defaultLang === 'hr'){
      this.currentLanguage = 'Hrvatski';
    }
    else if (this.translateService.defaultLang === 'en'){
      this.currentLanguage = 'English';
    }

    this.userService.isRoleAdmin();
  }

  logout() {
    this.loginService.logout();
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
  }
  isUserLoggedIn(): boolean {
    return !!this.userService.currentUser;
  }
  onLanguageChange(language: string): void {
    this.translateService.use(language);
    if(language === 'hr'){
      this.currentLanguage = 'Hrvatski';
    }
    else if (language === 'en'){
      this.currentLanguage = 'English';
    }
  }
}

