import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBulan } from '../interface/ibulan';

@Injectable({
  providedIn: 'root'
})
export class BulanService {

  constructor(private http: HttpClient) { }
  gets(): Observable<IBulan[]>{
    return this.http.get<IBulan[]>(`${environment.url}Bulan`)
    .pipe(map(resp => <IBulan[]>resp));
  }
  get(Kdbulan: number){
    return this.http.get<IBulan>(`${environment.url}Bulan/${Kdbulan}`)
    .pipe(map(resp => <IBulan>resp));
  }
  post(paramBody: IBulan){
    return this.http.post(`${environment.url}Bulan`, paramBody, {observe: 'response'});
  }
  put(paramBody: IBulan){
    return this.http.put(`${environment.url}Bulan`, paramBody, {observe: 'response'});
  }
  delete(Kdbulan: number){
    return this.http.request('DELETE', `${environment.url}Bulan/${Kdbulan}`, {observe: 'response'});
  }
}
