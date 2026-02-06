import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJtermorlun } from '../interface/ijtermorlun';

@Injectable({
  providedIn: 'root'
})
export class JtermorlunService {

  constructor(private http: HttpClient) { }
  gets(): Observable<IJtermorlun[]>{
    return this.http.get<IJtermorlun[]>(`${environment.url}Jtermorlun`)
      .pipe(map(resp => <IJtermorlun[]>resp));
  }
  get(Idjtermorlun: number){
    const param = new HttpParams()
    .set('Idjtermorlun',Idjtermorlun.toString());
    return this.http.get<IJtermorlun>(`${environment.url}Jtermorlun`, {params: param})
      .pipe(map(resp => <IJtermorlun>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jtermorlun`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jtermorlun`, paramBody, {observe: 'response'});
  }
  delete(Idjtermorlun: number){
    return this.http.request('DELETE',`${environment.url}Jtermorlun/${Idjtermorlun}`, {observe: 'response'});
  }
}
