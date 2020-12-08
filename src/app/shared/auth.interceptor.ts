import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from '../admin/shared/services/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }
    return next.handle(req)
      .pipe(
        tap((resp) => console.log('Interceptor: ', resp)),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.auth.logout();
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                auth_failed: true
              }
            })
          }
          return throwError(err)
    })
      )
  }

}