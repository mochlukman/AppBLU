import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJkeg } from '../interface/ijkeg';

@Injectable({
  providedIn: 'root'
})
export class JkegService {
  constructor(private http: HttpClient) { }
  gets(): Observable<IJkeg[]>{
    return this.http.get<IJkeg[]>(`${environment.url}Jkeg`).pipe(map(resp => <IJkeg[]>resp));
  }
  get(Jnskeg: number){
    return this.http.get<IJkeg>(`${environment.url}Jkeg/${Jnskeg}`).pipe(map(resp => <IJkeg>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jkeg`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.post(`${environment.url}Jkeg`, paramBody, {observe: 'response'});
  }
  delete(Jnskeg: number){
    return this.http.request('DELETE', `${environment.url}Jkeg/${Jnskeg}`, {observe: 'response'});
  }
}
