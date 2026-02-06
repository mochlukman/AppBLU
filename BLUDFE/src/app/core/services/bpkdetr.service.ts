import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpkdetr } from '../interface/ibpkdetr';

@Injectable({
  providedIn: 'root'
})
export class BpkdetrService {
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
  private Idbpk: number;
  set _idbpk(e: number){
    this.Idbpk = e;
  }
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<IBpkdetr>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(e: IBpkdetr){
    this.dataSelected.next(e);
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idbpk', this.Idbpk ? this.Idbpk.toString() : "0")
    .set('Parameters.Idkeg', this.Idkeg ? this.Idkeg.toString() : "0");
    return this.http.get(`${environment.url}Bpkdetr/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  gets(Idbpk: number, Idkeg: number) : Observable<IBpkdetr[]>{
    const param = new HttpParams()
      .set('Idbpk', Idbpk.toString())
      .set('Idkeg', Idkeg.toString());
    return this.http.get<IBpkdetr[]>(`${environment.url}Bpkdetr`, {params: param})
      .pipe(map(resp => <IBpkdetr[]>resp));
  }
  get(Idbpkdetr:number) : Observable<IBpkdetr>{
    return this.http.get(`${environment.url}Bpkdetr/${Idbpkdetr}`)
      .pipe(map(resp => <IBpkdetr>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bpkdetr`, paramBody, {observe: 'response'});
  }
  postSingle(paramBody: any){
    return this.http.post(`${environment.url}Bpkdetr/single`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bpkdetr`, paramBody, {observe: 'response'});
  }
  delete(Idbpkdetr:number){
    return this.http.request('DELETE', `${environment.url}Bpkdetr/${Idbpkdetr}`, {observe: 'response'});
  }
}
