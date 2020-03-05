import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let jwtToken = this.authService.getJwtToken();
		if (jwtToken) {
			request = request.clone({
				headers: request.headers.set("Authorization", jwtToken)
			});
		}
		

		return next.handle(request);
	}
}