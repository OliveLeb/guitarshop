import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  constructor(private http: HttpClient, private router: Router) {}
  url = 'https://immense-tundra-17548.herokuapp.com/connexion';
  // url: string = "http://localhost:6400/connexion";
  private readonly JWT_TOKEN = 'auth-token';
  // private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  private loggedUser: string;
  /*
  login(credentials) {
    return this.http.post(this.url, credentials);
  }*/

  login(credentials): Observable<any> {
    // appel à une API
    // observable
    // opérateur d'observable
    return this.http.post(this.url, credentials).pipe(
      map(res => {
        if (res['auth-token']) {
          localStorage.setItem('auth-token', res['auth-token']);
          console.log('connexion.service ok', credentials);
          return true;
        } else {
          console.log('erreur connexion.service', credentials);
          return false;
        }
      })
    );
  }
  /*
  login(credentials): Observable<boolean> {
    return this.http.post(this.url, credentials).pipe(
      tap(tokens => localStorage.setItem(this.JWT_TOKEN, tokens["auth-token"])),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }*/

  logout() {
    localStorage.removeItem('token');
  }

  logoutBack() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    const tokens = localStorage.getItem('token');

    if (!tokens) {
      return false;
    }
    // si on a token en localstorage vérifier qu'il est bien conforme

    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(tokens);

    return !isExpired;
  }
  /*
  private doLoginUser(identifiant: string, tokens: Tokens) {
    this.loggedUser = identifiant;
    this.storeTokens(tokens);
  }
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    //localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }*/
}
