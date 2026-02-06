import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MappingKdpService {
  constructor(private http: HttpClient) { }
  gets(Idrekkdp: number):Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Idrekkdp', Idrekkdp.toString());
    return this.http.get<any[]>(`${environment.url}MappingKDP`, {params: queryParam}).pipe(map(resp => <any[]>resp));
  }
  post(postbody: any){
    return this.http.post(`${environment.url}MappingKDP`, postbody, {observe: 'response'});
  }
  delete(Idsetkdp: number){
    return this.http.request('DELETE', `${environment.url}MappingKDP/${Idsetkdp}`, {observe: 'response'});
  }
}
