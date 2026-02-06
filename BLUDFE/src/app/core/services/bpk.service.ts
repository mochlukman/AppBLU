import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpk } from '../interface/ibpk';

@Injectable({
  providedIn: 'root'
})
export class BpkService {
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
  private Kdstatus: string;
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  resetProp(){
    this.Idunit = undefined;
    this.Kdstatus = undefined;
    this.Idxkode = undefined;
    this.Idkeg = undefined;
    this.Idbend = undefined;
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Kdstatus', this.Kdstatus ? this.Kdstatus.toString() : 'x')
    .set('Parameters.Idxkode', this.Idxkode ? this.Idxkode.toString() : '0')
    .set('Parameters.Idkeg', this.Idkeg ? this.Idkeg.toString() : '0')
    .set('Parameters.Idbend', this.Idbend ? this.Idbend.toString() : '0');
    return this.http.get(`${environment.url}Bpk/paging`,{params: qp}).pipe(map(resp => {
      this.resetProp();
      return <any>resp;
    }));
  }
  gets(Kdstatus: string, Idxkode: number, Idunit: number) : Observable<IBpk[]>{
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Kdstatus', Kdstatus)
      .set('Idxkode', Idxkode.toString());
    return this.http.get<IBpk[]>(`${environment.url}Bpk`, {params: param})
      .pipe(map(resp => <IBpk[]>resp));
  }
  get(Idbpk: number){
    return this.http.get<IBpk>(`${environment.url}Bpk/${Idbpk}`).pipe(map(resp => <IBpk>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bpk`, paramBody,{observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bpk`, paramBody,{observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Bpk/pengesahan`, paramBody, {observe: 'response'});
  }
  newNomorUrut(paramBody: any){
    return this.http.post(`${environment.url}Bpk/new-nomor-urut`, paramBody,{observe: 'response'});
  }
  delete(Idbpk: number){
    return this.http.request('DELETE', `${environment.url}Bpk/${Idbpk}`, {observe: 'response'});
  }
  getForBku(Idunit: number, Idbend: number){
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}Bpk/For-Bku`, {params: queryParam}).pipe(map(resp => <any>resp));
  }
  getForSpj(Idspj: number, Idunit:number, Kdstatus:string, Idbend: number){
    const queryParam = new HttpParams()
      .set('Idspj', Idspj.toString())
      .set('Idunit', Idunit.toString())
      .set('Kdstatus', Kdstatus.toString())
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}Bpk/For-Spj`, {params: queryParam}).pipe(map(resp => <any>resp));
  }
}
