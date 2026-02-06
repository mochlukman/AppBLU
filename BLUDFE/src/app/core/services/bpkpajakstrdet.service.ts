import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpkpajakstrdet } from '../interface/ibpkpajakstrdet';

@Injectable({
  providedIn: 'root'
})
export class BpkpajakstrdetService {
  private Idbpkpajakstr: number;
  set _idbpkpajakstr(e: number){
    this.Idbpkpajakstr = e;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<IBpkpajakstrdet[]>{
    const qp = new HttpParams()
    .set('Idbpkpajakstr', this.Idbpkpajakstr ? this.Idbpkpajakstr.toString() : "0");
    return this.http.get<IBpkpajakstrdet[]>(`${environment.url}Bpkpajakstrdet`, {params: qp}).pipe(map(resp => <IBpkpajakstrdet[]>resp));
  }
  get(idbpkpajakstrdet: number){
    return this.http.get<IBpkpajakstrdet>(`${environment.url}Bpkpajakstrdet/${idbpkpajakstrdet}`).pipe(map(resp => <IBpkpajakstrdet>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Bpkpajakstrdet`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Bpkpajakstrdet`, postBody, {observe: 'response'});
  }
  delete(idbpkpajakstrdet: number){
    return this.http.request('DELETE', `${environment.url}Bpkpajakstrdet/${idbpkpajakstrdet}`, {observe: 'response'});
  }
}
