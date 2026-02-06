import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPegawai } from '../interface/ipegawai';

@Injectable({
  providedIn: 'root'
})
export class PegawaiService {
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
  private Idpeg: number;
  set _idpeg(e: number){
    this.Idpeg = e;
  }
  private Nip: string;
  set _nip(e: string){
    this.Nip = e;
  }
  private Kdgol: string;
  set _kdgol(e: string){
    this.Kdgol = e;
  }
  constructor(private http: HttpClient) { }
  gets(): Observable<IPegawai[]>{
    const param = new HttpParams()
    .set('Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Idpeg', this.Idpeg ? this.Idpeg.toString() : '0')
    .set('Kdgol', this.Kdgol ? this.Kdgol.toString() : 'x')
    .set('Nip', this.Nip ? this.Nip.toString() : 'x');
    return this.http.get<IPegawai[]>(`${environment.url}Pegawai`, {params: param}).pipe(map(resp => <IPegawai[]>resp));
  }
  get(idpeg: number){
    return this.http.get<IPegawai>(`${environment.url}Pegawai/${idpeg}`).pipe(map(resp => <IPegawai>resp));
  }
  getsByPemda(): Observable<IPegawai[]>{
    return this.http.get<IPegawai[]>(`${environment.url}Pegawai/by-tabel-pemda`).pipe(map(resp => <IPegawai[]>resp));
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0')
    .set('Parameters.Idpeg', this.Idpeg ? this.Idpeg.toString() : '0')
    .set('Parameters.Kdgol', this.Kdgol ? this.Kdgol.toString() : 'x')
    .set('Parameters.Nip', this.Nip ? this.Nip.toString() : 'x');
    return this.http.get(`${environment.url}Pegawai/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Pegawai`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Pegawai`, postBody, {observe: 'response'});
  }
  delete(idpeg: number){
    return this.http.request('DELETE',`${environment.url}Pegawai/${idpeg}`, {observe: 'response'});
  }
}
