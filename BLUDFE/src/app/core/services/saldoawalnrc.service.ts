import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaldoawalnrcService {
  constructor(private http: HttpClient) {
  }

  gets(param?: any): Observable<any[]> {
    return this.http.get(`${environment.url}Saldoawalnrc`, {params: param}).pipe(map(resp => <any[]> resp));
  }

  get(id: number) {
    return this.http.get(`${environment.url}Saldoawalnrc/${id}`).pipe(map(resp => <any> resp));
  }

  post(paramBody: any) {
    return this.http.post(`${environment.url}Saldoawalnrc`, paramBody, {observe: 'response'});
  }

  put(paramBody: any) {
    return this.http.put(`${environment.url}Saldoawalnrc`, paramBody, {observe: 'response'});
  }

  delete(id: number) {
    return this.http.request('DELETE', `${environment.url}Saldoawalnrc/${id}`, {observe: 'response'});
  }
}
