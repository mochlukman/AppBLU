import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJbank } from '../interface/ijbank';

@Injectable({
  providedIn: 'root'
})
export class JbankService {

  constructor(private http: HttpClient) { }
  gets() : Observable<IJbank[]>{
    return this.http.get<IJbank[]>(`${environment.url}Jbank`)
      .pipe(map(resp => <IJbank[]>resp));
  }
  get(Idbank: number){
    return this.http.get<IJbank>(`${environment.url}Jbank/${Idbank}`)
      .pipe(map(resp => <IJbank>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jbank`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jbank`, paramBody, {observe: 'response'});
  }
  delete(Idbank: number){
    return this.http.request('DELETE', `${environment.url}Jbank/${Idbank}`, {observe: 'response'});
  }
}
