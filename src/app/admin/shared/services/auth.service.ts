import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { FirebaseAuthResponse } from '../../../shared/interfaces';
import { log } from 'util';

@Injectable()

export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('firebase-token-expires'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('firebase-token');
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  login(user): Observable<FirebaseAuthResponse | HttpErrorResponse> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        tap(() => console.log('this: ', this)),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
    this.router.navigate(['/admin', 'login']);
  }

  isAuthenticated() {
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const expireTokenDate = Date.now() + (+response.expiresIn * 1000);
      localStorage.setItem('firebase-token', response.idToken);
      localStorage.setItem('firebase-token-expires', expireTokenDate.toString());
    } else {
      localStorage.clear();
    }
  }

  handleError(err: HttpErrorResponse) {
    const {message} = err.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Email is not correct');
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
