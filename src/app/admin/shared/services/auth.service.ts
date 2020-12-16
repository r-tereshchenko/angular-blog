import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { FirebaseAuthResponse } from '../../../shared/interfaces';

@Injectable()

export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  isTokenExpired = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get token(): string | null {
    const isExpiration = localStorage.getItem('fb-token-expiration');
    const expDate = new Date(localStorage.getItem('fb-token-expiration'));
    if (isExpiration && new Date() > expDate) {
      this.isTokenExpired = true;
    }

    if (!isExpiration || new Date() > expDate) {
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  login(user): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const expDate = new Date(Date.now() + (+response.expiresIn * 1000));
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-expiration', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  handleError(err: HttpErrorResponse) {
    const {message} = err.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Email is not valid');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email is not found');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password');
        break;
    }

    return throwError(err);
  }
}
