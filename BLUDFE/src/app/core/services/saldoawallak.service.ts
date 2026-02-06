import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaldoawallakService {
  constructor(private http: HttpClient) {
  }

  gets(param?: any): Observable<any[]> {
    return this.http.get(`${environment.url}Saldoawallak`, {params: param}).pipe(map(resp => <any[]> resp));
  }

  post(paramBody: any) {
    return this.http.post(`${environment.url}Saldoawallak`, paramBody, {observe: 'response'});
  }

  put(paramBody: any) {
    return this.http.put(`${environment.url}Saldoawallak`, paramBody, {observe: 'response'});
  }

  delete(id: number) {
    return this.http.request('DELETE', `${environment.url}Saldoawallak/${id}`, {observe: 'response'});
  }
}
