import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJabttd } from '../interface/ijabttd';

@Injectable({
  providedIn: 'root'
})
export class JabttdService {

  constructor(private http: HttpClient) { }
  gets(Kddok?:string): Observable<IJabttd[]>{
    const param = new HttpParams().set('Kddok', Kddok? Kddok : '');
    return this.http.get<IJabttd[]>(`${environment.url}Jabttd`, {params: param}).pipe(map(resp => <IJabttd[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jabttd`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jabttd`, paramBody, {observe: 'response'});
  }
  delete(Idttd: number){
    return this.http.request('DELETE', `${environment.url}Jabttd/${Idttd}`, {observe:'response'});
  }
}
