import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { IWEbGroup } from './../interface/iweb-group';

@Injectable({
	providedIn: 'root'
})
export class WebGroupService {
	private listWebGroup = new BehaviorSubject(<IWEbGroup[]>null);
	public _listWebGroup = this.listWebGroup.asObservable();
	constructor(private http: HttpClient) {}
	gets(): Observable<IWEbGroup[]> {
		return this.http.get<IWEbGroup[]>(`${environment.url}Webgroup`).pipe(map((resp) => <IWEbGroup[]>resp));
	}
	set(data: IWEbGroup[]) {
		return this.listWebGroup.next(data);
	}
	post(paramBody: any){
		return this.http.post(`${environment.url}Webgroup`, paramBody, {observe: 'response'});
	}
	put(paramBody: any){
		return this.http.put(`${environment.url}Webgroup`, paramBody, {observe: 'response'});
	}
	delete(paramBody: any){
		return this.http.request('DELETE', `${environment.url}Webgroup`, {
			body: paramBody,
			observe: 'response'
		});
	}
}
