import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPaguskpd } from '../interface/ipaguskpd';

@Injectable({
  providedIn: 'root'
})
export class PaguskpdService {
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
  constructor(private http: HttpClient) { }
  paging(){
    const qp = new HttpParams()
      .set('Start', this.Start.toString())
      .set('Rows', this.Rows.toString())
      .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
      .set('SortField', this.SortField ? this.SortField : '')
      .set('SortOrder', this.SortOrder.toString())
      .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap.trim() : 'x');
    return this.http.get(`${environment.url}Paguskpd/paging`, {params: qp}).pipe(map(resp => <any>resp));
  }
  gets(kdtahap: string): Observable<IPaguskpd[]>{
    const param = new HttpParams().set('Kdtahap', kdtahap);
    return this.http.get<IPaguskpd[]>(`${environment.url}Paguskpd`, {params: param}).pipe(map(resp => <IPaguskpd[]>resp));
  }
  get(idpaguskpd: number){
    return this.http.get<IPaguskpd>(`${environment.url}Paguskpd/${idpaguskpd}`).pipe(map(resp => <IPaguskpd>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Paguskpd`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Paguskpd`, paramBody, {observe: 'response'});
  }
  delete(idpaguskpd: number){
    return this.http.request('DELETE',`${environment.url}Paguskpd/${idpaguskpd}`, {observe: 'response'});
  }
}
