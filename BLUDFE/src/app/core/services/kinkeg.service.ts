import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IKinkeg } from '../interface/ikinkeg';

@Injectable({
  providedIn: 'root'
})
export class KinkegService {
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
  private Idkegunit: number;
  set _idkegunit(e: number){
    this.Idkegunit = e;
  }
  private Kdjkk: string;
  set _kdjkk(e: string){
    this.Kdjkk = e;
  }
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets():Observable<IKinkeg[]>{
    const qp = new HttpParams()
    .set('Parameter.Idkegunit', this.Idkegunit ? this.Idkegunit.toString() : '0')
    .set('Parameter.Kdjkk', this.Kdjkk ? this.Kdjkk : 'x');
    return this.http.get<IKinkeg[]>(`${environment.url}Kinkeg`,{params: qp}).pipe(map(resp => <IKinkeg[]>resp));
  }
  get(Idkinkeg: number){
    return this.http.get(`${environment.url}Kinkeg/${Idkinkeg}`).pipe(map(resp => <IKinkeg>resp));
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap.trim() : 'x')
    .set('Parameters.Idkegunit', this.Idkegunit ? this.Idkegunit.toString() : '0')
    .set('Parameters.Kdjkk', this.Kdjkk ? this.Kdjkk : 'x');
    return this.http.get(`${environment.url}Kinkeg/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Kinkeg`, postBody, {observe:'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Kinkeg`, postBody, {observe:'response'});
  }
  delete(Idkinkeg: number){
    return this.http.request('DELETE', `${environment.url}Kinkeg/${Idkinkeg}`, {observe: 'response'});
  }
}
