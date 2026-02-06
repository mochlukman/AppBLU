import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISppcheckdok } from '../interface/isppcheckdok';

@Injectable({
  providedIn: 'root'
})
export class SppcheckdokService {
  private Idspp: number;
  set _idspp(e: number){
    this.Idspp = e;
  }
  private Idcheck: number;
  set _idcheck(e: number){
    this.Idcheck = e;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<ISppcheckdok[]>{
    const qp = new HttpParams()
    .set('Idcheck', this.Idcheck ? this.Idcheck.toString() : "0")
    .set('Idspp', this.Idspp ? this.Idspp.toString() : "0");
    return this.http.get<ISppcheckdok[]>(`${environment.url}Sppcheckdok`, { params: qp }).pipe(map(resp => <ISppcheckdok[]>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Sppcheckdok`, postBody, {observe: 'response'});
  }
  delete(postBody: any){
    return this.http.request('DELETE', `${environment.url}Sppcheckdok`, {body: postBody, observe: 'response'});
  }
}
