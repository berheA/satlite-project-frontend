import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthenticationService implements CanActivate{

  constructor(private router: Router) {}

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem("userId")) {
          console.log(sessionStorage.getItem("userId"));
          return true;
        } else {
          console.log("Not logged in");
          this.router.navigate(['/login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
    }
  }