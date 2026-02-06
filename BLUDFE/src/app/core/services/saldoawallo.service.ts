import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaldoawalloService {
  constructor(private http: HttpClient) {
  }

  gets(param?: any): Observable<any[]> {
    return this.http.get(`${environment.url}Saldoawallo`, {params: param}).pipe(map(resp => <any[]> resp));
  }

  get(id: number) {
    return this.http.get(`${environment.url}Saldoawallo/${id}`).pipe(map(resp => <any> resp));
  }

  post(paramBody: any) {
    return this.http.post(`${environment.url}Saldoawallo`, paramBody, {observe: 'response'});
  }

  put(paramBody: any) {
    return this.http.put(`${environment.url}Saldoawallo`, paramBody, {observe: 'response'});
  }

  delete(id: number) {
    return this.http.request('DELETE', `${environment.url}Saldoawallo/${id}`, {observe: 'response'});
  }
}
