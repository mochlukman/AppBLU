import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDaftunit } from '../interface/idaftunit';
import { IDpa } from '../interface/idpa';

@Injectable({
  providedIn: 'root'
})
export class DpaService {
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
  constructor(private http: HttpClient) { }
  gets(Idunit: number, Idxkode?: number): Observable<IDpa[]>{
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idxkode', Idxkode.toString());
    return this.http.get<IDpa[]>(`${environment.url}Dpa`, {params: param})
      .pipe(map(resp => <IDpa[]>resp));
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : "0")
    .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap.toString() : "x");
    return this.http.get(`${environment.url}Dpa/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Dpa`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Dpa`, paramBody, {observe: 'response'});
  }
  delete(Iddpa: number){
    return this.http.request('DELETE', `${environment.url}Dpa/${Iddpa}`, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Dpa/pengesahan`, paramBody, {observe: 'response'});
  }
  penolakan(paramBody: any){
    return this.http.put(`${environment.url}Dpa/penolakan`, paramBody, {observe: 'response'});
  }
}
