import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpkpajakdet } from '../interface/ibpkpajakdet';

@Injectable({
  providedIn: 'root'
})
export class BpkpajakdetService {
  private Idbpkpajak: number;
  set _idbpkpajak(e: number){
    this.Idbpkpajak = e;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<IBpkpajakdet[]>{
    const qp = new HttpParams()
    .set('Idbpkpajak', this.Idbpkpajak ? this.Idbpkpajak.toString() : "0");
    return this.http.get<IBpkpajakdet[]>(`${environment.url}Bpkpajakdet`, {params: qp}).pipe(map(resp => <IBpkpajakdet[]>resp));
  }
  get(idbpkpajakdet: number){
    return this.http.get<IBpkpajakdet>(`${environment.url}Bpkpajakdet/${idbpkpajakdet}`).pipe(map(resp => <IBpkpajakdet>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Bpkpajakdet`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Bpkpajakdet`, postBody, {observe: 'response'});
  }
  delete(idbpkpajakdet: number){
    return this.http.request('DELETE', `${environment.url}Bpkpajakdet/${idbpkpajakdet}`, {observe: 'response'});
  }
}
