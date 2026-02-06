import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISp2dcheckdok } from '../interface/isp2dcheckdok';

@Injectable({
  providedIn: 'root'
})
export class Sp2dcheckdokService {
  private Idsp2d: number;
  set _idsp2d(e: number){
    this.Idsp2d = e;
  }
  private Idcheck: number;
  set _idcheck(e: number){
    this.Idcheck = e;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<ISp2dcheckdok[]>{
    const qp = new HttpParams()
    .set('Idcheck', this.Idcheck ? this.Idcheck.toString() : "0")
    .set('Idsp2d', this.Idsp2d ? this.Idsp2d.toString() : "0");
    return this.http.get<ISp2dcheckdok[]>(`${environment.url}Sp2dcheckdok`, { params: qp }).pipe(map(resp => <ISp2dcheckdok[]>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Sp2dcheckdok`, postBody, {observe: 'response'});
  }
  delete(postBody: any){
    return this.http.request('DELETE', `${environment.url}Sp2dcheckdok`, {body: postBody, observe: 'response'});
  }
}
