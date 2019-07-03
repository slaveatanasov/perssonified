import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {
	}

	// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	// 	if (this.authService.isJwtAuth()) {
	// 		return true;
	// 	} else {
	// 		this.router.navigate(['/login']);
	// 		// this.router.navigate(['/tfa-challenge'], {queryParams: {tempId: response.tempId, userId: response.userId}})
	// 	}
	// }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.isJwtAuth()) {
			this.router.navigate(['/dashboard']);
			return true;
		} else {
			this.router.navigate(['/login']);
			console.log('this else happened...')
		}
	}
}