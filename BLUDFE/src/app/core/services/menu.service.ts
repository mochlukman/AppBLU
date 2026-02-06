import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu, IMenuTree } from '../interface/imenu';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {}
	get(GroupId: string): Observable<IMenu[]> {
		let params = new HttpParams().set('GroupId', GroupId);
		return this.http.get<IMenu[]>(`${environment.url}Menu`, { params: params }).pipe(map((resp) => <IMenu[]>resp));
	}
	getTreeMenu(GroupId: string): Observable<IMenuTree[]> {
		const queryParam = new HttpParams().set('GroupId', GroupId);
		return this.http
			.get<IMenuTree[]>(`${environment.url}Menu/TreeMenuWebRole`, { params: queryParam })
			.pipe(map((resp) => <IMenuTree[]>resp));
	}
}
