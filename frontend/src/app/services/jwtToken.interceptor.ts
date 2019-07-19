import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('in jwt token interceptor')
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`
      }
    });

    return next.handle(request);
  }
}