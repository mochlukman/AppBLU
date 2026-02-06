import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJusaha } from '../interface/ijusaha';

@Injectable({
  providedIn: 'root'
})
export class JusahaService {

  constructor(private http: HttpClient) { }
  gets() : Observable<IJusaha[]>{
    return this.http.get<IJusaha[]>(`${environment.url}Jusaha`)
      .pipe(map(resp => <IJusaha[]>resp));
  }
  get(Idjusaha: number){
    return this.http.get<IJusaha>(`${environment.url}Jusaha/${Idjusaha}`)
      .pipe(map(resp => <IJusaha>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jusaha`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jusaha`, paramBody, {observe: 'response'});
  }
  delete(Idjusaha: number){
    return this.http.request('DELETE', `${environment.url}Jusaha/${Idjusaha}`, {observe: 'response'});
  }
}
