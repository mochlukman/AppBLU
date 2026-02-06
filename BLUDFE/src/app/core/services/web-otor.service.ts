import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class WebOtorService {
	constructor(private http: HttpClient) {}
	post(GroupId: string, RoleId: any) {
		return this.http.post(`${environment.url}WebOtor/${GroupId}`, RoleId, { observe: 'response' });
	}
	remove(GroupId: string, roleIds) {
		return this.http.request('DELETE', `${environment.url}WebOtor/${GroupId}`, {
			body: roleIds,
			headers: {},
			observe: 'response'
		});
	}
}
