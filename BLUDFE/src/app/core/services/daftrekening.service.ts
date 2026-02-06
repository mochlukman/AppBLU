import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpkSpjTreeTableRoot } from '../interface/ibpk-spj';
import { IDaftrekening } from '../interface/idaftrekening';
import { ILookupTree } from '../interface/iglobal';

@Injectable({
  providedIn: 'root'
})
export class DaftrekeningService {
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
  private Idunit: number = 0;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idbend: number = 0;
  set _idbend(e : number){
    this.Idbend = e;
  }
  private Idxkode: number = 0;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  private Kdstatus: string = '';
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private Idjnsakun: string; // pisahkan dengan koma (,) jika lebih dari satu
  set _idjnsakun(e: string){
    this.Idjnsakun = e;
  }
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  private KdperStartwith: string;
  set _kdperStartwith(e: string){
    this.KdperStartwith = e;
  }
  private Mtglevel: string;
  set _Mtglevel(e: string){
    this.Mtglevel = e;
  }
  private Trkr: number;
  set _trkr(e: number){
    this.Trkr = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
  private Nmper: string;
  set _nmper(e: string){
    this.Nmper = e;
  }
  constructor(private http: HttpClient){ }
  search(Startwith: string, Mtglevel: string, Keyword: string) : Observable<IDaftrekening[]>{ // jika mtg level lebih dari satu, pisah dengan koma tanpa spasi
    const param = new HttpParams()
    .set('Startwith', Startwith)
    .set('Mtglevel', Mtglevel.toString())
    .set('Keyword', Keyword);
    return this.http.get<IDaftrekening[]>(`${environment.url}Daftrekening/search`,{params: param})
      .pipe(map(resp => <IDaftrekening[]>resp));
  }
  get(params?: any){
    const param = new HttpParams({fromObject: params});
    return this.http.get<IDaftrekening[]>(`${environment.url}Daftrekening`,{params: param})
      .pipe(map(resp => <IDaftrekening[]>resp));
  }
  getByStartKode(Kode: string){ // JIka lebih dari satu, pisah kan dengan koma
    const param = new HttpParams()
    .set('Kode', Kode);
    return this.http.get<IDaftrekening[]>(`${environment.url}Daftrekening/start-kode`,{params: param})
      .pipe(map(resp => <IDaftrekening[]>resp));
  }
  getByJnsakun(){
    const param = new HttpParams()
    .set('Idjnsakun', this.Idjnsakun ?  this.Idjnsakun.toString() : "x");
    return this.http.get<IDaftrekening[]>(`${environment.url}Daftrekening/by-jnsakun`,{params: param})
      .pipe(map(resp => <IDaftrekening[]>resp));
  }
  getByJnsakunType(param: any){
    const qp = new HttpParams()
      .set('Start', this.Start.toString())
      .set('Rows', this.Rows.toString())
      .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
      .set('Parameters.Idjnsakun', param.Idjnsakun)
      .set('Parameters.Type', param.Type);
    return this.http.get(`${environment.url}Daftrekening/by-jnsakun-type`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getByJnsakunAndNmper(){
    const param = new HttpParams()
    .set('Idjnsakun', this.Idjnsakun ?  this.Idjnsakun.toString() : "x")
    .set('Nmper', this.Nmper);
    return this.http.get<IDaftrekening[]>(`${environment.url}Daftrekening/by-jnsakun-nmper`,{params: param})
      .pipe(map(resp => <IDaftrekening[]>resp));
  }
  getByStartKodePaging(Kode: string){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : 'kdper')
    .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
    .set('Parameters.Kode', Kode);
    return this.http.get(`${environment.url}Daftrekening/start-kode/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getByStsdetd(Idunit: number, Idbend: number, Idxkode: number, Kdstatus: string){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', Idunit.toString())
    .set('Parameters.Idbend', Idbend.toString())
    .set('Parameters.Idxkode', Idxkode.toString())
    .set('Parameters.Kdstatus', Kdstatus);
    return this.http.get(`${environment.url}Daftrekening/by-stsdetd`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getForStsdetr(Idunit: number,Idkeg: number, Idbend: number, Idxkode: number, Kdstatus: string, KdperStartwith: string, Mtglevel: string){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', Idunit.toString())
    .set('Parameters.Idkeg', Idkeg.toString())
    .set('Parameters.Idbend', Idbend.toString())
    .set('Parameters.Idxkode', Idxkode.toString())
    .set('Parameters.Kdstatus', Kdstatus)
    .set('Parameters.KdperStartwith', KdperStartwith)
    .set('Parameters.Mtglevel', Mtglevel);
    return this.http.get(`${environment.url}Daftrekening/for-stsdetr`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getBySpmdetd(Idunit: number, Idbend: number, Idxkode: number, Kdstatus: string){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', Idunit.toString())
    .set('Parameters.Idbend', Idbend.toString())
    .set('Parameters.Idxkode', Idxkode.toString())
    .set('Parameters.Kdstatus', Kdstatus);
    return this.http.get(`${environment.url}Daftrekening/by-spmdetd`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getBySpmdetb(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Idbend', this.Idbend ? this.Idbend.toString() : '0')
    .set('Parameters.Idxkode', this.Idxkode ? this.Idxkode.toString() : '0')
    .set('Parameters.Kdstatus', this.Kdstatus ? this.Kdstatus : 'x')
    .set('Parameters.Idjnsakun', this.Idjnsakun ? this.Idjnsakun.toString() : '0');
    return this.http.get(`${environment.url}Daftrekening/by-spmdetb`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getForRkad(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap.toString() : 'x')
    .set('Parameters.Idjnsakun', this.Idjnsakun ? this.Idjnsakun.toString() : '0');
    return this.http.get(`${environment.url}Daftrekening/for-rkad`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getForRkar(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Idjnsakun', this.Idjnsakun ? this.Idjnsakun.toString() : '0')
    .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap.toString() : 'x')
    .set('Parameters.Idkeg', this.Idkeg ? this.Idkeg.toString() : '0');
    return this.http.get(`${environment.url}Daftrekening/for-rkar`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getForRkab(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Idjnsakun', this.Idjnsakun ? this.Idjnsakun.toString() : '0')
    .set('Parameters.Idkeg', this.Idkeg ? this.Idkeg.toString() : '0')
    .set('Parameters.KdperStartwith', this.KdperStartwith ? this.KdperStartwith : 'x')
    .set('Parameters.Kdtahap', this.Kdtahap ? this.Kdtahap.toString() : 'x')
    .set('Parameters.Trkr', this.Trkr ? this.Trkr.toString() : '0');
    return this.http.get(`${environment.url}Daftrekening/for-rkab`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getBySpddetr(Idspd: number, Idkeg?: number){
    const param = new HttpParams()
      .set('Idspd', Idspd.toString())
      .set('Idkeg', Idkeg ? Idkeg.toString() : '0');
      return this.http.get<IDaftrekening[]>(`${environment.url}Daftrekening/by-spddetr`,{params: param})
      .pipe(map(resp => <IDaftrekening[]>resp));
  }
  getByRkar(Idunit: number, Idkeg: number){
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idkeg', Idkeg.toString());
    return this.http.get<IDaftrekening[]>(`${environment.url}Daftrekening/by-rkar`,{params: param})
      .pipe(map(resp => <IDaftrekening[]>resp));
  }
  getTreeCheckboxByDpa(
    Idunit:number,
    Idspp: number,
    Kdtahap: string,
    Idnojetra: number,
    Idxkode: number,
    Kdstatus: string): Observable<ILookupTree[]>{
    const param = new HttpParams()
    .set('Idunit', Idunit.toString())
    .set('Idspp', Idspp.toString())
    .set('Kdtahap', Kdtahap)
    .set('Idnojetra', Idnojetra.toString())
    .set('Idxkode', Idxkode.toString())
    .set('Kdstatus', Kdstatus);
    return this.http.get<ILookupTree[]>(`${environment.url}Daftrekening/tree-checkbox-by-dpa`, {params: param})
      .pipe(map(resp => <ILookupTree[]>resp));
  }
  getTreeTableByBpk(Idbpk: number) : Observable<IBpkSpjTreeTableRoot[]>{
    const param = new HttpParams()
    .set('Idbpk', Idbpk.toString());
    return this.http.get<IBpkSpjTreeTableRoot[]>(`${environment.url}Daftrekening/tree-by-bpk`, {params: param}).pipe(map(resp => <IBpkSpjTreeTableRoot[]>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Daftrekening`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Daftrekening`, postBody, {observe: 'response'});
  }
  delete(idrek: number){
    return this.http.request('DELETE', `${environment.url}Daftrekening/${idrek}`, {observe: 'response'});
  }
  getbyDpa(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Mtglevel', this.Mtglevel ? this.Mtglevel.toString() : 'x')
    .set('Parameters.KdperStartwith', this.KdperStartwith ? this.KdperStartwith.toString() : 'x')
    .set('Parameters.Idkeg', this.Idkeg ? this.Idkeg.toString() : '0');
    return this.http.get(`${environment.url}Daftrekening/by-dpa`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getbyDpab(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Mtglevel', this.Mtglevel ? this.Mtglevel.toString() : 'x')
    .set('Parameters.KdperStartwith', this.KdperStartwith ? this.KdperStartwith.toString() : 'x');
    return this.http.get(`${environment.url}Daftrekening/by-dpab`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getbyDpaSpp(Idunit: number, Idkeg?: number){
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idkeg', Idkeg ? Idkeg.toString() : '0');
    return this.http.get<IDaftrekening[]>(`${environment.url}Daftrekening/by-dpa-spp`,{params: param})
      .pipe(map(resp => <IDaftrekening[]>resp));
  }
}
