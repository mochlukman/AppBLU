import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISp2d } from '../interface/isp2d';

@Injectable({
  providedIn: 'root'
})
export class Sp2dService {
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
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  private Kdstatus: string;
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  private Iddp: number;
  set _iddp(e: number){
    this.Iddp = e;
  }
  private Forbpk: string;
  set _forbpk(e: string){ //forbok = parameter jika data SP2D akan di input di BPK, untuk pengecekan apakah sp2d sudah di input atau belum
    this.Forbpk = e;
  }
  private Penolakan: string;
  set _penolakan(e: string){
    this.Penolakan = e;
  }
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  constructor(private http: HttpClient) { }
  gets(): Observable<ISp2d[]>{
    const param = new HttpParams()
      .set('Idunit', this.Idunit ? this.Idunit.toString() : "0")
      .set('Kdstatus',this.Kdstatus ? this.Kdstatus : "x")
      .set('Idxkode', this.Idxkode ? this.Idxkode.toString() : "0")
      .set('Forbpk', this.Forbpk ? this.Forbpk : 'false')
      .set('Penolakan', this.Penolakan ? this.Penolakan : 'x')
      .set('Idkeg', this.Idkeg ? this.Idkeg.toString() : '0');
    return this.http.get<ISp2d[]>(`${environment.url}Sp2d`, {params: param})
      .pipe(map(resp => {
        this.resetProperty();
        return <ISp2d[]>resp;
      }));
  }
  resetProperty(){
    this.Idunit = undefined;
    this.Kdstatus = undefined;
    this.Idxkode = undefined;
    this.Idbend = undefined;
    this.Idkeg = undefined;
    this.Iddp = undefined;
    this.Forbpk = undefined;
    this.Penolakan = undefined;
  }
  getNoreg(Idunit: number){
    const param = new HttpParams().set('Idunit', Idunit.toString());
    return this.http.get(`${environment.url}Sp2d/noreg`, {params: param}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sp2d`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Sp2d`, paramBody, {observe: 'response'});
  }
  delete(Idsp2d: number){
    return this.http.request('DELETE',`${environment.url}Sp2d/${Idsp2d}`, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Sp2d/pengesahan`, paramBody, {observe: 'response'});
  }
  getForBku(Idunit: number, Idbend: number){
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}Sp2d/For-Bku`, {params: queryParam}).pipe(map(resp => <any>resp));
  }
  getForBkud(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Kdstatus', this.Kdstatus ? this.Kdstatus.toString() : 'x')
    .set('Parameters.Idxkode', this.Idxkode ? this.Idxkode.toString() : '0')
    .set('Parameters.Idbend', this.Idbend ? this.Idbend.toString() : '0');
    return this.http.get(`${environment.url}Sp2d/for-bku-bud`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getForDpdet(Iddp: number, Idxkode: number) : Observable<ISp2d[]>{
    const qp = new HttpParams()
    .set('Iddp', Iddp.toString())
    .set('Idxkode', Idxkode.toString());
    return this.http.get<ISp2d[]>(`${environment.url}Sp2d/for-dp`,{params: qp}).pipe(map(resp => <ISp2d[]>resp));
  }
  getPaging(params: any){
    params['Parameters.Idunit'] = params['Parameters.Idunit'] ? params['Parameters.Idunit'] : 0;
    params['Parameters.Kdstatus'] = params['Parameters.Kdstatus'] ? params['Parameters.Kdstatus'] : 'x';
    params['Parameters.Idxkode'] = params['Parameters.Idxkode'] ? params['Parameters.Idxkode'] : 0;
    params['Parameters.Idkeg'] = params['Parameters.Idkeg'] ? params['Parameters.Idkeg'] : 0;
    params['Parameters.Forbpk'] = params['Parameters.Forbpk'] ? params['Parameters.Forbpk'] : 'false';
    params['Parameters.Forbku'] = params['Parameters.Forbku'] ? params['Parameters.Forbku'] : 'false';
    params['Parameters.Penolakan'] = params['Parameters.Penolakan'] ? params['Parameters.Penolakan'] : 'x';
    params['Parameters.Idbend'] = params['Parameters.Idbend'] ? params['Parameters.Idbend'] : 0;
    return this.http.get(`${environment.url}Sp2d/paging`,{params: params}).pipe(map(resp => <any>resp));
  }
  getByDp(){ // Get Berdasarkan DP (Daftar Penguji)
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
    .set('Parameters.Iddp', this.Iddp ? this.Iddp.toString() : '0');
    return this.http.get(`${environment.url}Sp2d/by-dp`,{params: qp}).pipe(map(resp => <any>resp));
  }
}
