import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITahap, ITahapTL } from '../interface/itahap';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TahapService {
	private Start: number;
  set _start(e: number){
    this.Start = e;
  }
  private Rows: number;
  set _rows(e: number){
    this.Rows = e;
  }
  private GlobalFilter: string = '';
  set _globalFilter(e: string){
    this.GlobalFilter = e;
  }
  private SortField: string = '';
  set _sortField(e: string){
    this.SortField = e;
  }
  private SortOrder: number;
  set _sortOrder(e: number){
    this.SortOrder = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
	constructor(private http: HttpClient) {}
	paging(){
		const qp = new HttpParams()
      .set('Start', this.Start.toString())
      .set('Rows', this.Rows.toString())
      .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
      .set('SortField', this.SortField ? this.SortField : '')
      .set('SortOrder', this.SortOrder.toString())
      .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap.trim() : 'x');
    return this.http.get(`${environment.url}Tahap/Paging`, {params: qp}).pipe(map(resp => <any>resp));
	}
	gets(): Observable<ITahap[]>{
		return this.http.get<ITahap[]>(`${environment.url}Tahap`).pipe(map(resp => <ITahap[]>resp));
	}
	getsBykode(kode: string){
		const param = new HttpParams().set('Kode', kode);
		return this.http.get<ITahap[]>(`${environment.url}Tahap/bykode`,{params: param}).pipe(map(resp => <ITahap[]>resp));
	}
	get(Kdtahap: string){
		return this.http.get(`${environment.url}Tahap/${Kdtahap}`).pipe(map(resp => <ITahap>resp));
	}
	post(paramBody: any){
		return this.http.post(`${environment.url}Tahap`, paramBody, {observe: 'response'});
	}
	put(paramBody: any){
		return this.http.put(`${environment.url}Tahap`, paramBody, {observe: 'response'});
	}
	delete(Kdtahap: string){
		return this.http.request('DELETE',`${environment.url}Tahap/${Kdtahap}`, { observe: 'response'});
	}
	lock(Kdtahap: string) {
		return this.http.put(`${environment.url}Tahap/Lock/${Kdtahap}`, {}, { observe: 'response' });
	}
}
