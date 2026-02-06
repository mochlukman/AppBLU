import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITahun } from '../interface/itahun';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TahunService {

  constructor(private http: HttpClient) { }
  get() {
		return this.http.get<ITahun[]>(`${environment.url}Tahun`).pipe(map((resp) => <ITahun[]>resp));
	}
	serach(keyword: string){
		const queryParam = new HttpParams().set('keyword', keyword);
		return this.http.get(`${environment.url}Tahun/search`, {params: queryParam}).pipe(map((resp) => <ITahun[]>resp));
	}
	post(paramBody: any) {
		return this.http.post(`${environment.url}Tahun`, paramBody, { observe: 'response' });
	}
	update(kdtahun: string, nmtahun: string) {
		const queryParam = new HttpParams().set('nmtahun', nmtahun);
		return this.http.put(`${environment.url}Tahun/${kdtahun}`, {}, { params: queryParam, observe: 'response' });
	}
	delete(bodyParam: any) {
		return this.http.request('DELETE', `${environment.url}Tahun`, { body: bodyParam, observe: 'response' });
	}
}
