import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpkpajakstr } from '../interface/ibpkpajakstr';

@Injectable({
  providedIn: 'root'
})
export class BpkpajakstrService {
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  private Kdstatus: string;
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }

  constructor(private http: HttpClient) { }
  gets() : Observable<IBpkpajakstr[]>{
    const qp = new HttpParams()
      .set('Idunit', this.Idunit ? this.Idunit.toString() : "0")
      .set('Idbend', this.Idbend ? this.Idbend.toString() : "0")
    .set('Kdstatus', this.Kdstatus ? this.Kdstatus : "x");
    return this.http.get<IBpkpajakstr[]>(`${environment.url}Bpkpajakstr`, {params: qp}).pipe(map(resp => <IBpkpajakstr[]>resp));
  }
  get(Idbpkpajakstr: number){
    return this.http.get<IBpkpajakstr>(`${environment.url}Bpkpajakstr/${Idbpkpajakstr}`).pipe(map(resp => <IBpkpajakstr>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Bpkpajakstr`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Bpkpajakstr`, postBody, {observe: 'response'});
  }
  delete(Idbpkpajakstr: number){
    return this.http.request('DELETE', `${environment.url}Bpkpajakstr/${Idbpkpajakstr}`, {observe: 'response'});
  }
  pengesahan(postBody: any){
    return this.http.put(`${environment.url}Bpkpajakstr/pengesahan`, postBody, {observe: 'response'});
  }
}
