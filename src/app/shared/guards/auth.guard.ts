import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.auth.onAuthStateChanged(user => {
          if (user) {
            resolve(true);
          } else {
            console.log('User is not logged in');
            this.router.navigate(['/login']);
            resolve(false);
          }
        });
      });
  }

}
