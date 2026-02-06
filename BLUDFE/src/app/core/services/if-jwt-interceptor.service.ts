import { Injectable } from '@angular/core';
import { AuthenticationService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class IfJwtInterceptorService implements HttpInterceptor {
	constructor(private authService: AuthenticationService) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add authorization header with jwt token if available
		let currentUser = this.authService.getAccessToken();
		if (currentUser) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser}`
				}
			});
		}

		return next.handle(request);
	}
}
