import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpd } from '../interface/ispd';

@Injectable({
  providedIn: 'root'
})
export class SpdService {

  constructor(private http: HttpClient) { }
  gets(Idunit: number, Idxkode: number): Observable<ISpd[]>{
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idxkode', Idxkode.toString());
    return this.http.get<ISpd[]>(`${environment.url}Spd`, {params: param})
      .pipe(map(resp => <ISpd[]>resp));
  }
  get(Idspd: number){
    return this.http.get<ISpd[]>(`${environment.url}Spd/${Idspd}`)
      .pipe(map(resp => <ISpd[]>resp));
  }
  getsByUnit(Idunit: number): Observable<ISpd[]>{
    const param = new HttpParams()
      .set('Idunit', Idunit.toString());
    return this.http.get<ISpd[]>(`${environment.url}Spd/by-unit`, {params: param})
      .pipe(map(resp => <ISpd[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spd`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Spd`, paramBody, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Spd/pengesahan`, paramBody, {observe: 'response'});
  }
}
