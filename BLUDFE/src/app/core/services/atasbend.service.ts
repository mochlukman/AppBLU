import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtasbendService {
  constructor(private http: HttpClient) { }
  gets(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.url}Atasbend`)
      .pipe(map(resp => <any[]>resp));
  }
  get(Idpa: number){
    return this.http.get(`${environment.url}Atasbend/${Idpa}`).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Atasbend`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Atasbend`, paramBody, {observe: 'response'});
  }
  delete(Idpa: number){
    return this.http.request('DELETE',`${environment.url}Atasbend/${Idpa}`, {observe: 'response'});
  }
}
