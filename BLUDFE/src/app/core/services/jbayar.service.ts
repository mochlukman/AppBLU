import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJbayar } from '../interface/ijbayar';

@Injectable({
  providedIn: 'root'
})
export class JbayarService {

  constructor(private http: HttpClient) { }
  gets() : Observable<IJbayar[]>{
    return this.http.get<IJbayar[]>(`${environment.url}Jbayar`).pipe(map(resp => <IJbayar[]>resp));
  }
  get(Idjbayar: number){
    return this.http.get<IJbayar>(`${environment.url}Jbayar/${Idjbayar}`).pipe(map(resp => <IJbayar>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jbayar`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jbayar`, paramBody, {observe: 'response'});
  }
  delete(Idjbayar: number){
    return this.http.request('DELETE', `${environment.url}Jbayar/${Idjbayar}`, {observe: 'response'});
  }
}
