import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJsatuan } from '../interface/ijsatuan';

@Injectable({
  providedIn: 'root'
})
export class JSatuanService {

  constructor(private http: HttpClient) { }
  gets(): Observable<IJsatuan[]>{
    return this.http.get<IJsatuan[]>(`${environment.url}Jsatuan`)
      .pipe(map(resp => <IJsatuan[]>resp));
  }
  get(id: number): Observable<IJsatuan>{
    return this.http.get<IJsatuan>(`${environment.url}Jsatuan/${id}`)
      .pipe(map(resp => <IJsatuan>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jsatuan`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jsatuan`, paramBody, {observe: 'response'});
  }
  delete(id: number){
    return this.http.request('DELETE', `${environment.url}Jsatuan/${id}`, {observe: 'response'});
  }
}
