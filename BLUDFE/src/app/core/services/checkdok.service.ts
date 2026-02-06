import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICheckdok } from '../interface/icheckdok';

@Injectable({
  providedIn: 'root'
})
export class CheckdokService {
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  private Idspp: number;  // digunakan untuk get data berdasarkan sppcheckbox, atau != sppcheckbox, atau tidak mengambil data yang sudah masuk ke sppcheckdox
  set _idspp(e: number){
    this.Idspp = e;
  }
  private Idsp2d: number;  // digunakan untuk get data berdasarkan sp2dcheckbox, atau != sp2dcheckbox, atau tidak mengambil data yang sudah masuk ke sp2dcheckbox
  set _idsp2d(e: number){
    this.Idsp2d = e;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<ICheckdok[]>{
    const qp = new HttpParams()
    .set('Idxkode', this.Idxkode ? this.Idxkode.toString() : "0")
    .set('Idspp', this.Idspp ? this.Idspp.toString() : "0")
    .set('Idsp2d', this.Idsp2d ? this.Idsp2d.toString() : "0");
    return this.http.get<ICheckdok[]>(`${environment.url}Checkdok`, { params: qp }).pipe(map(resp => <ICheckdok[]>resp));
  }
  get(Idcheck: number){
    return this.http.get<ICheckdok>(`${environment.url}Checkdok/${Idcheck}`).pipe(map(resp => <ICheckdok>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Checkdok`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Checkdok`, postBody, {observe: 'response'});
  }
  delete(Idcheck: number){
    return this.http.request('DELETE', `${environment.url}Checkdok/${Idcheck}`, {observe: 'response'});
  }
}
