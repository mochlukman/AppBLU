import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJkinkeg } from '../interface/ijkinkeg';

@Injectable({
  providedIn: 'root'
})
export class JkinkegService {
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
  private Kdjkk: string;
  set _kdjkk(e: string){
    this.Kdjkk = e;
  }
  constructor(private http: HttpClient) { }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString());
    return this.http.get(`${environment.url}Jkinkeg/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  gets(): Observable<IJkinkeg[]>{
    return this.http.get<IJkinkeg[]>(`${environment.url}Jkinkeg`).pipe(map(resp => <IJkinkeg[]>resp));
  }
  get(kdjkk: string){
    return this.http.get(`${environment.url}Jkinkeg/${kdjkk}`).pipe(map(resp => <IJkinkeg>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Jkinkeg`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Jkinkeg`, postBody, {observe: 'response'});
  }
  delete(kdjkk: string){
    return this.http.request('DELETE', `${environment.url}Jkinkeg/${kdjkk}`, {observe: 'response'});
  }
}
