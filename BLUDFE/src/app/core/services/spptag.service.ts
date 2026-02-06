import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpptagService {

  constructor(private http: HttpClient) { }
  gets(Idspp: number): Observable<any[]>{
    const param = new HttpParams()
      .set('Idspp', Idspp.toString());
    return this.http.get<any[]>(`${environment.url}Spptag`,{params: param}).pipe(map(resp => <any[]>resp));
  }
  get(Idspptag : number){
    return this.http.get<any>(`${environment.url}Spptag/${Idspptag }`).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spptag`, paramBody, {observe: 'response'});
  }
  delete(Idspptag: number){
    return this.http.request('DELETE', `${environment.url}Spptag/${Idspptag}`, {observe: 'response'});
  }
}
