import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpj, ISpjLookupForSpp } from '../interface/ispj';

@Injectable({
  providedIn: 'root'
})
export class SpjService {
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
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  constructor(private http: HttpClient) { }
  gets(Idunit: number, Idbend: number, Kdstatus: string) : Observable<ISpj[]>{
    const qp = new HttpParams()
    .set('Idunit', Idunit.toString())
    .set('Idbend', Idbend.toString())
    .set('Kdstatus', Kdstatus.toString());
    return this.http.get<ISpj[]>(`${environment.url}Spj`,{params: qp}).pipe(map(resp => <ISpj[]>resp));
  }
  forLpj(Idlpj: number, Idunit: number, Idbend: number, Kdstatus: string) : Observable<ISpj[]>{
    const qp = new HttpParams()
    .set('Idlpj', Idlpj.toString())
    .set('Idunit', Idunit.toString())
    .set('Idbend', Idbend.toString())
    .set('Kdstatus', Kdstatus.toString());
    return this.http.get<ISpj[]>(`${environment.url}Spj/for-lpj`,{params: qp}).pipe(map(resp => <ISpj[]>resp));
  }
  getPaging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idunit', this.Idunit ?  this.Idunit.toString() : '0')
    .set('Parameters.Kdstatus', this.Kdstatus ? this.Kdstatus.toString() : 'x')
    .set('Parameters.Idbend', this.Idbend ? this.Idbend.toString() : '0');
    return this.http.get(`${environment.url}Spj/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spj`, paramBody, {observe:'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Spj`, paramBody, {observe:'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Spj/pengesahan`, paramBody, {observe:'response'});
  }
  validasi(paramBody: any){
    return this.http.put(`${environment.url}Spj/validasi`, paramBody, {observe:'response'});
  }
  delete(Idspj: number){
    return this.http.request('DELETE', `${environment.url}Spj/${Idspj}`, {observe: 'response'});
  }
  getLookupForSpp(params: any) : Observable<ISpjLookupForSpp[]>{
      return this.http.get<ISpjLookupForSpp[]>(`${environment.url}Spj/lookup-for-spp`, {params: params})
      .pipe(map(resp => <ISpjLookupForSpp[]>resp));
  }
}
