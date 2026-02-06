import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';
import { IWebRole } from '../interface/iweb-role';

@Injectable({
	providedIn: 'root'
})
export class WebRoleService {
	private listWebRole = new BehaviorSubject([]);
	public _listWEbRole = this.listWebRole.asObservable();
	constructor(private http: HttpClient) {}
	get(){
		return this.http.get(`${environment.url}Webrole`).pipe(map(resp => <IWebRole[]>resp));
	}
	getTreeTable() {
		return this.http.get<TreeNode[]>(`${environment.url}WebRole/TreeTable`).pipe(map((resp) => <TreeNode[]>resp));
	}
	getByGroupId(GroupId: string): Observable<IWebRole[]> {
		const params = new HttpParams().set('GroupId', GroupId);
		return this.http
			.get<IWebRole[]>(`${environment.url}WebRole/GetByGroupId`, { params: params })
			.pipe(map((resp) => <IWebRole[]>resp));
	}
	setList(data: IWebRole[]) {
		return this.listWebRole.next(data);
	}
	postHideShow(paramBody: any){
		return this.http.post(`${environment.url}WebRole/hide-show/menu`, paramBody, {observe: 'response'});
	}
	putIcon(paramBody: any){
		return this.http.put(`${environment.url}WebRole/change/icon`, paramBody, {observe: 'response'});
	}
}
