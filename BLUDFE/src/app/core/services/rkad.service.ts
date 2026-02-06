import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRkad, IRkadetd } from '../interface/irkad';

@Injectable({
  providedIn: 'root'
})
export class RkadService {
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
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap : 'x');
    return this.http.get(`${environment.url}Rkad/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Rkad`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Rkad`, postBody, {observe: 'response'});
  }
  delete(Idrkad: number){
    return this.http.request('DELETE', `${environment.url}Rkad/${Idrkad}`, {observe: 'response'});
  }
}
