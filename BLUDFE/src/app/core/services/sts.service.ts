import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISts } from '../interface/ists';

@Injectable({
  providedIn: 'root'
})
export class StsService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<ISts>null);
  public _dataSelected = this.dataSelected.asObservable();
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
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(data: ISts):void{
    this.dataSelected.next(data);
  }
  gets(Idunit: number, Idbend: number, Kdstatus?: string, Idxkode?: number): Observable<ISts[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit ? Idunit.toString() : '0')
      .set('Kdstatus', Kdstatus)
      .set('Idxkode', Idxkode ? Idxkode.toString() : '1')
      .set('Idbend', Idbend ? Idbend.toString() : '0');
    return this.http.get<ISts[]>(`${environment.url}Sts`, {params: queryParam}).pipe(map(resp => <ISts[]>resp));
  }
  forBku(Idunit: number, Idbend: number, Kdstatus?: string, Idxkode?: number): Observable<ISts[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Kdstatus', Kdstatus)
      .set('Idxkode', Idxkode ? Idxkode.toString() : '1')
      .set('Idbend', Idbend ? Idbend.toString() : '0');
    return this.http.get<ISts[]>(`${environment.url}Sts/For-Bku`, {params: queryParam}).pipe(map(resp => <ISts[]>resp));
  }
  paging(Idunit: number, Kdstatus?: string, Idxkode?: number): Observable<any>{
    const queryParam = new HttpParams()
      .set('Start', this.Start.toString())
      .set('Rows', this.Rows.toString())
      .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
      .set('SortField', this.SortField ? this.SortField : '')
      .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
      .set('Parameters.Idunit', Idunit ? Idunit.toString() : "0")
      .set('Parameters.Kdstatus', Kdstatus ? Kdstatus : 'x')
      .set('Parameters.Idxkode', Idxkode ? Idxkode.toString() : '0');
    return this.http.get<any>(`${environment.url}Sts/paging`, {params: queryParam}).pipe(map(resp => <any>resp));
  }
  get(Idsts : number){
    return this.http.get<ISts>(`${environment.url}Sts/${Idsts}`).pipe(map(resp => <ISts>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sts`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Sts`, paramBody, {observe: 'response'});
  }
  delete(Idsts : number){
    return this.http.request('DELETE', `${environment.url}Sts/${Idsts}`, {observe: 'response'});
  }
  getForBkud(Idunit: number, Kdstatus: string, Idxkode: number, Idbend: number){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
    .set('Parameters.Idunit', Idunit ? Idunit.toString() : '0')
    .set('Parameters.Kdstatus', Kdstatus ? Kdstatus.toString() : '')
    .set('Parameters.Idxkode', Idxkode ? Idxkode.toString() : '0')
    .set('Parameters.Idbend', Idbend ? Idbend.toString() : '0');
    return this.http.get(`${environment.url}Sts/for-bku-bud`,{params: qp}).pipe(map(resp => <any>resp));
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Sts/Pengesahan`, paramBody, {observe: 'response'});
  }
  getNoreg(Idunit: number){
    const param = new HttpParams().set('Idunit', Idunit.toString());
    return this.http.get(`${environment.url}Sts/noreg`, {params: param}).pipe(map(resp => <any>resp));
  }
}