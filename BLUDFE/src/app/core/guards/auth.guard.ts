import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private jwtHelper: JwtHelperService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = localStorage.getItem('token');
        if (!user || this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
			return false;
        }
        // if (!user) {
		// 	this.router.navigate(['/account/auth/login'], { queryParams: { returnUrl: state.url } });
		// 	return false;
        // }
        return true;
    }
}