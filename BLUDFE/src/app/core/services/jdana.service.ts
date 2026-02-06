import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJdana } from '../interface/ijdana';

@Injectable({
  providedIn: 'root'
})
export class JdanaService {

  constructor(private http: HttpClient) { }
  gets(): Observable<IJdana[]>{
    return this.http.get<IJdana[]>(`${environment.url}Jdana`).pipe(map(resp => <IJdana[]>resp));
  }
  get(Idjdana: number){
    return this.http.get<IJdana>(`${environment.url}Jdana/${Idjdana}`).pipe(map(resp => <IJdana>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jdana`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.post(`${environment.url}Jdana`, paramBody, {observe: 'response'});
  }
  delete(Idjdana: number){
    return this.http.request('DELETE', `${environment.url}Jdana/${Idjdana}`, {observe: 'response'});
  }
}
