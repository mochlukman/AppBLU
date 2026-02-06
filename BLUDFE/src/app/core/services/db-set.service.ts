import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvServiceProvider } from './env.service.provider';

@Injectable({
  providedIn: 'root'
})
export class DbSetService implements HttpInterceptor {
	constructor() {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add authorization header with jwt token if available
		let dbSuffix = EnvServiceProvider.useFactory().dbSuffix;
    let tahun_suffix = localStorage.getItem('tahun_suffix');
    request = request.clone({
      setHeaders: {
        'api-suffix': `${dbSuffix}`,
        'tahun-suffix' : tahun_suffix ? `${tahun_suffix}` : ''
      }
    });
		return next.handle(request);
	}
}