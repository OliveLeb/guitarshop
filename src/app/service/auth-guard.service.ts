import { Injectable } from '@angular/core';
import { ConnexionService } from './connexion.service';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private service: ConnexionService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (this.service.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/'], { queryParams: { return_url: state.url } });
    return false;
  }
}
