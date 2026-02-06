import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILookupTree, ILookupTree2 } from '../interface/iglobal';

@Injectable({
  providedIn: 'root'
})
export class KegunitService {
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
  private Idpgrmunit: number;
  set _idpgrmunit(e: number){
    this.Idpgrmunit = e;
  }
  private Idkegunit: number;
  set _idkegunit(e: number){
    this.Idkegunit = e;
  }
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
  private Type: string; //digukanan untuk struk tree, isi kegiatan jika hanya sampai kegiatan, sub kegitan jika sampai sub kegiatan, default 'kegiatan'
  set _type(e: string){
    this.Type = e;
  }
  constructor(private http: HttpClient) { }
  tree() : Observable<ILookupTree2[]>{
    const param = new HttpParams()
    .set('Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Kdtahap', this.Kdtahap ? this.Kdtahap : 'x')
    .set('Type', this.Type ? this.Type : 'kegiatan');
    return this.http.get<ILookupTree2[]>(`${environment.url}Kegunit/tree`, {params: param})
      .pipe(map(resp => <ILookupTree2[]>resp));
  }
  paging(){
    const qp = new HttpParams()
      .set('Start', this.Start.toString())
      .set('Rows', this.Rows.toString())
      .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
      .set('SortField', this.SortField ? this.SortField : '')
      .set('SortOrder', this.SortOrder.toString())
      .set('Parameters.Idpgrmunit', this.Idpgrmunit ? this.Idpgrmunit.toString() : "0")
      .set('Parameters.Idkeg', this.Idkeg ? this.Idkeg.toString() : "0");
    return this.http.get(`${environment.url}Kegunit/paging`, {params: qp}).pipe(map(resp => <any>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Kegunit`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Kegunit`, postBody, {observe: 'response'});
  }
  delete(idkegunit: number){
    return this.http.request('DELETE', `${environment.url}Kegunit/${idkegunit}`, {observe: 'response'});
  }
}
