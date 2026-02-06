import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDaftunit } from '../interface/idaftunit';

@Injectable({
  providedIn: 'root'
})
export class DaftunitService {
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
  private Kdlevel: number;
  set _kdlevel(e: number){
    this.Kdlevel = e;
  }
  constructor(private http: HttpClient) { }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Kdlevel', this.Kdlevel ? this.Kdlevel.toString() : '0');
    return this.http.get(`${environment.url}Daftunit/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  get(Idunit: number){
    return this.http.get(`${environment.url}Daftunit/${Idunit}`).pipe(map(resp => <IDaftunit>resp));
  }
  gets(Level: string): Observable<IDaftunit[]>{ // jika level lebih dari 1, berik tanda koma(,) untuk separator, tanda spasi
    const param = new HttpParams().set('Level', Level);
    return this.http.get<IDaftunit[]>(`${environment.url}Daftunit`, {params: param}).pipe(map(resp => <IDaftunit[]>resp));
  }
  getsByDpa(Level: string): Observable<IDaftunit[]>{ // jika level lebih dari 1, berik tanda koma(,) untuk separator, tanda spasi
    const param = new HttpParams().set('Level', Level);
    return this.http.get<IDaftunit[]>(`${environment.url}Daftunit/by-dpa`, {params: param}).pipe(map(resp => <IDaftunit[]>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Daftunit`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Daftunit`, postBody, {observe: 'response'});
  }
  delete(idunit: number){
    return this.http.request('DELETE', `${environment.url}Daftunit/${idunit}`, {observe: 'response'});
  }
}
