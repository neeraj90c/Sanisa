import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './Common/Authentication/auth.service';


export class ValidationInterceptor implements HttpInterceptor {

  constructor() { }
  private authService = inject(AuthService)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ClientId': environment.appClientId
        }
      })
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          if(error.status == 401){
            this.authService.SignOutUser()
          }
        }
        console.log(errorMsg);
        return throwError(() => errorMsg);
      }),
      finalize(() => {
        //finalize
      })
    )
  }
}
