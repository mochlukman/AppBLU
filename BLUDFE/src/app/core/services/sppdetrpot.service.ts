import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SppdetrpotService {

  constructor(private  http: HttpClient) { }
  gets(idsppdetr: number): Observable<any[]>{
    const param = new HttpParams()
      .set('idsppdetr', idsppdetr.toString());
    return this.http.get<any[]>(`${environment.url}Sppdetrpot`,{params: param}).pipe(map(resp => <any[]>resp));
  }
  get(idsppdetrpot: number){
    return this.http.get<any>(`${environment.url}Sppdetrpot/${idsppdetrpot}`).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sppdetrpot`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Sppdetrpot`, paramBody, {observe: 'response'});
  }
  delete(idsppdetrpot: number){
    return this.http.request('DELETE', `${environment.url}Sppdetrpot/${idsppdetrpot}`, {observe: 'response'});
  }
}
