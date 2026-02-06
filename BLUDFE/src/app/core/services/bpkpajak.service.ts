import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpkpajak } from '../interface/ibpkpajak';

@Injectable({
  providedIn: 'root'
})
export class BpkpajakService {
  private Idbpk: number;
  set _idbpk(e: number){
    this.Idbpk = e;
  }
  private Kdstatus: string;
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private Idbpkpajakstr: number; // digunakan untuk get data != BPKPAJAKSTRDET / untuk input kee BPKPAJAKSTRDET
  set _idbpkpajakstr(e: number){
    this.Idbpkpajakstr = e;
  }
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  private resetProp(): void{
    this._idbpk = undefined;
    this._kdstatus = undefined;
    this._idbpkpajakstr = undefined;
    this._idunit = undefined;
    this._idbend = undefined;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<IBpkpajak[]>{
    const qp = new HttpParams()
    .set('Idbpk', this.Idbpk ? this.Idbpk.toString() : "0")
    .set('Kdstatus', this.Kdstatus ? this.Kdstatus : "x")
    .set('Idbpkpajakstr', this.Idbpkpajakstr ? this.Idbpkpajakstr.toString() : "0")
    .set('Idunit', this.Idunit ? this.Idunit.toString() : "0")
    .set('Idbend', this.Idbend ? this.Idbend.toString() : "0");
    return this.http.get<IBpkpajak[]>(`${environment.url}Bpkpajak`, {params: qp}).pipe(map(resp => {
      this.resetProp();
      return <IBpkpajak[]>resp;
    }));
  }
  get(Idbpkpajak: number){
    return this.http.get<IBpkpajak>(`${environment.url}Bpkpajak/${Idbpkpajak}`).pipe(map(resp => <IBpkpajak>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Bpkpajak`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Bpkpajak`, postBody, {observe: 'response'});
  }
  delete(Idbpkpajak: number){
    return this.http.request('DELETE', `${environment.url}Bpkpajak/${Idbpkpajak}`, {observe: 'response'});
  }
}
