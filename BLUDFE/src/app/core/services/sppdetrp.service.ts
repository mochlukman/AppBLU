import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISppdetrp } from '../interface/isppdetrp';

@Injectable({
  providedIn: 'root'
})
export class SppdetrpService {

  constructor(private http: HttpClient) { }
  gets(idsppdetr: number): Observable<ISppdetrp[]>{
    const param = new HttpParams()
      .set('idsppdetr', idsppdetr.toString());
    return this.http.get<ISppdetrp[]>(`${environment.url}Sppdetrp`,{params: param}).pipe(map(resp => <ISppdetrp[]>resp));
  }
  get(idsppdetrp: number){
    return this.http.get<ISppdetrp>(`${environment.url}Sppdetrp/${idsppdetrp}`).pipe(map(resp => <ISppdetrp>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sppdetrp`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Sppdetrp`, paramBody, {observe: 'response'});
  }
  delete(idsppdetrp: number){
    return this.http.request('DELETE', `${environment.url}Sppdetrp/${idsppdetrp}`, {observe: 'response'});
  }
}
