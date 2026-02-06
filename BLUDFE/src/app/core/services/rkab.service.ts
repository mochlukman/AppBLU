import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDaftunit } from '../interface/idaftunit';

@Injectable({
  providedIn: 'root'
})
export class RkabService {
	private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
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
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
	private Trkr: number;
	set _trkr(e: number){
		this.Trkr = e;
	}
  constructor(private http: HttpClient) { }
	setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap : 'x')
    .set('Parameters.Trkr', this.Trkr ? this.Trkr.toString() : '0');
    return this.http.get(`${environment.url}Rkab/paging`,{params: qp}).pipe(map(resp => {
      this._trkr = 0;
      return <any>resp;
    }));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Rkab`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Rkab`, postBody, {observe: 'response'});
  }
  delete(Idrkab: number){
    return this.http.request('DELETE', `${environment.url}Rkab/${Idrkab}`, {observe: 'response'});
  }
}
