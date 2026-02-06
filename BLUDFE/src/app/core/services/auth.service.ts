import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from '../services/cookie.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	jwtHelper: JwtHelperService = new JwtHelperService([]);
	constructor(private http: HttpClient) {
	}
	login(credentials: any) {
			return this.http.post<any>(`${environment.url}Auth`, credentials);
	}
	storeLocal(data: any) {
	localStorage.setItem('token', data.token);
	}
	getTokenInfo() {
		return this.jwtHelper.decodeToken(localStorage.getItem('token'));
	}
	getAccessToken() {
		return localStorage.getItem('token');
	}
	getUser() {
		return JSON.parse(localStorage.getItem('user'));
	}
	getTahun() {
		return this.http.get<any>(`${environment.url}tahun`);
	}
	registerUser(data) {
		return this.http.post(`${environment.url}Auth/register`, data);
	}
	getTahunSession(){
		return localStorage.getItem('tahun_suffix');
	}
	logout() {
    if(localStorage.getItem('token') !== null) {
      this.http.post(`${environment.url}Auth/logout`, {}).subscribe(resp => {
        localStorage.removeItem('token');
        localStorage.removeItem('tahun_suffix');
      }, (error) => {
        if(error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('tahun_suffix');
        }
      });
    }
	}
}

