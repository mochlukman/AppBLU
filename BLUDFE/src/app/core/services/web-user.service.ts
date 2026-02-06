import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IWebUser } from '../interface/iweb-user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WebUserService {
	private listWebUser = new BehaviorSubject(<IWebUser[]>null);
	public _listWebUser = this.listWebUser.asObservable();
	private tabIndex = new BehaviorSubject(<number>0);
	public _tabIndex = this.tabIndex.asObservable();
	constructor(private http: HttpClient) {}
	setTabindex(e: number): void{
    this.tabIndex.next(e);
  }
	setList(data: any[]) {
		return this.listWebUser.next(data);
	}
	getAll(): Observable<IWebUser[]> {
		return this.http.get<IWebUser[]>(`${environment.url}Webuser`).pipe(map((resp) => <IWebUser[]>resp));
	}
	getById(GroupId: string): Observable<IWebUser> {
		return this.http.get<IWebUser>(`${environment.url}Webuser/${GroupId}`).pipe(map((resp) => <IWebUser>resp));
	}
	getByGroupId(GroupId: string, Idunit?: number): Observable<IWebUser[]> {
		const queryParam = new HttpParams()
		.set('Idunit', Idunit ? Idunit.toString() : '0')
		.set('GroupId', GroupId);
		return this.http
			.get<IWebUser[]>(`${environment.url}Webuser/ByGroup`, { params: queryParam })
			.pipe(map((resp) => <IWebUser[]>resp));
	}
	post(paramBody: any) {
		return this.http.post(`${environment.url}Webuser`, paramBody, { observe: 'response' });
	}
	put(paramBody: any){
		return this.http.put(`${environment.url}Webuser`, paramBody, { observe: 'response' });
	}
	delete(userid: string){
		return this.http.request('DELETE', `${environment.url}Webuser/${userid}`, {observe: 'response'});
	}
	postSandi(paramBody: any){
		return this.http.post(`${environment.url}Webuser/change_sandi`, paramBody, {observe: 'response'});
	}
	getBloked(): Observable<IWebUser[]> {
		return this.http.get<IWebUser[]>(`${environment.url}Webuser/list/bloked`).pipe(map((resp) => <IWebUser[]>resp));
	}
	openBlok(userid: any){
		return this.http.post(`${environment.url}Webuser/open-blok/${userid}`, {}, {observe: 'response'});
	}
	resetPassword(userid: string){
		return this.http.post(`${environment.url}Webuser/reset_password/${userid}`, {}, {observe: 'response'});
	}
	approval(paramBody: any){
		return this.http.post(`${environment.url}Webuser/Approval`, paramBody, {observe: 'response'});
	}
}
