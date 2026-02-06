import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPajak } from '../interface/ipajak';

@Injectable({
  providedIn: 'root'
})
export class PajakService {
  private Idjnspajak: number;
  set _idjnspajak(e: number){
    this.Idjnspajak = e;
  }
  private Idsppdetr: number;
  set _idsppdetr(e: number){
    this.Idsppdetr = e;
  }
  private Idbpkpajak: number;
  set _idbpkpajak(e: number){
    this.Idbpkpajak = e;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<IPajak[]>{
    const params = new HttpParams()
    .set('Idjnspajak', this.Idjnspajak ? this.Idjnspajak.toString() : '0')
    .set('Idsppdetr', this.Idsppdetr ? this.Idsppdetr.toString() : '0')
    .set('Idbpkpajak', this.Idbpkpajak ? this.Idbpkpajak.toString() : '0');
    return this.http.get<IPajak[]>(`${environment.url}Pajak`,{params: params}).pipe(map(resp => <IPajak[]>resp));
  }
  get(idpajak: number){
    return this.http.get<IPajak>(`${environment.url}Pajak/${idpajak}`).pipe(map(resp => <IPajak>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Pajak`, postBody,{observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Pajak`, postBody,{observe: 'response'});
  }
  delete(idpajak: number){
    return this.http.request('DELETE',`${environment.url}Pajak/${idpajak}`, {observe: 'response'});
  }
}
