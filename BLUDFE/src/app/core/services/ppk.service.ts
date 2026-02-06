import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PpkService {
  constructor(private http: HttpClient) { }
  gets(params?: any): Observable<any[]>{
    return this.http.get<any[]>(`${environment.url}Ppk`, {params: params})
      .pipe(map(resp => <any[]>resp));
  }
  get(id: number){
    return this.http.get(`${environment.url}Ppk/${id}`).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Ppk`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Ppk`, paramBody, {observe: 'response'});
  }
  delete(id: number){
    return this.http.request('DELETE',`${environment.url}Ppk/${id}`, {observe: 'response'});
  }
}
