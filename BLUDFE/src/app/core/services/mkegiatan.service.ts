import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILookupTree, ILookupTree2 } from '../interface/iglobal';
import { IMkegiatan } from '../interface/imkegiatan';

@Injectable({
  providedIn: 'root'
})
export class MkegiatanService {
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
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  private Idprgrm: number;
  set _idprgrm(e: number){
    this.Idprgrm = e;
  }
  private Kdperspektif: number;
  set _kdperspektif(e: number){
    this.Kdperspektif = e;
  }
  private Levelkeg: number;
  set _levelkeg(e: number){
    this.Levelkeg = e;
  }
  private Idkeginduk: number;
  set _idkeginduk(e: number){
    this.Idkeginduk = e;
  }
  private Jnskeg: number;
  set _jnskeg(e: number){
    this.Jnskeg = e;
  }
  private Idpgrmunit: number;
  set _idpgrmunit(e: number){ // ini diisi kalau lookup yang diingikan != kegiatan yang ada di kegunit / untuk input ke keguni
    this.Idpgrmunit = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
  private Type: string; //digukanan untuk struk tree, isi kegiatan jika hanya sampai kegiatan, sub kegitan jika sampai sub kegiatan, default 'kegiatan'
  set _type(e: string){
    this.Type = e;
  }
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  constructor(private http: HttpClient) { }
  treeByDpa(Idunit: number, Kdtahap: string) : Observable<ILookupTree[]>{
    const param = new HttpParams()
    .set('Idunit', Idunit.toString())
    .set('Kdtahap', Kdtahap);
    return this.http.get<ILookupTree[]>(`${environment.url}Mkegiatan/tree-by-dpa`, {params: param})
      .pipe(map(resp => <ILookupTree[]>resp));
  }
  treeByKegunit() : Observable<ILookupTree2[]>{
    const param = new HttpParams()
    .set('Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Kdtahap', this.Kdtahap ? this.Kdtahap : 'x')
    .set('Type', this.Type ? this.Type : 'kegiatan');
    return this.http.get<ILookupTree2[]>(`${environment.url}Mkegiatan/tree-by-kegunit`, {params: param})
      .pipe(map(resp => <ILookupTree2[]>resp));
  }
  get(idkeg:number){
    return this.http.get(`${environment.url}Mkegiatan/${idkeg}`).pipe(map(resp => <IMkegiatan>resp));
  }
  gets(): Observable<IMkegiatan[]>{
    const qp = new HttpParams()
      .set('Idkeg', this.Idkeg ?  this.Idkeg.toString() : "0")
      .set('Idprgrm', this.Idprgrm ?  this.Idprgrm.toString() : "0")
      .set('Kdperspektif', this.Kdperspektif ?  this.Kdperspektif.toString() : "0")
      .set('Levelkeg', this.Idkeg ?  this.Levelkeg.toString() : "0")
      .set('Idkeginduk', this.Idkeginduk ?  this.Idkeginduk.toString() : "0")
      .set('Jnskeg', this.Jnskeg ?  this.Jnskeg.toString() : "0")
      .set('Type', this.Type ?  this.Type.toString() : "x");
    return this.http.get<IMkegiatan[]>(`${environment.url}Mkegiatan`, {params: qp}).pipe(map(resp => <IMkegiatan[]>resp));
  }
  paging(){
    const qp = new HttpParams()
      .set('Start', this.Start.toString())
      .set('Rows', this.Rows.toString())
      .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
      .set('SortField', this.SortField ? this.SortField : '')
      .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
      .set('Parameters.Idkeg', this.Idkeg ?  this.Idkeg.toString() : "0")
      .set('Parameters.Idprgrm', this.Idprgrm ?  this.Idprgrm.toString() : "0")
      .set('Parameters.Idpgrmunit', this.Idpgrmunit ?  this.Idpgrmunit.toString() : "0")
      .set('Parameters.Kdperspektif', this.Kdperspektif ?  this.Kdperspektif.toString() : "0")
      .set('Parameters.Levelkeg', this.Idkeg ?  this.Levelkeg.toString() : "0")
      .set('Parameters.Idkeginduk', this.Idkeginduk ?  this.Idkeginduk.toString() : "0")
      .set('Parameters.Jnskeg', this.Jnskeg ?  this.Jnskeg.toString() : "0")
      .set('Parameters.Type', this.Type ?  this.Type.toString() : "x");
    return this.http.get(`${environment.url}Mkegiatan/paging`, {params: qp}).pipe(map(resp => <any>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Mkegiatan`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Mkegiatan`, postBody, {observe: 'response'});
  }
  delete(Idkeg: number){
    return this.http.request('DELETE', `${environment.url}MKegiatan/${Idkeg}`, {observe: 'response'});
  }
}