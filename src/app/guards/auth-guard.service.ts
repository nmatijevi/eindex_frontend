import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      map(user => {
        if (user) {
          const isUserUser = this.userService.isRoleUser();
            if (isUserUser) {
                return true;
            } else {
                this.router.navigate(['/forbidden']);
                return false;
            }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

