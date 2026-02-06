import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJbend } from '../interface/ijbend';

@Injectable({
  providedIn: 'root'
})
export class JbendService {

  constructor(private http: HttpClient) { }
  gets():Observable<IJbend[]>{
    return this.http.get(`${environment.url}Jbend`).pipe(map(resp => <IJbend[]>resp));
  }
  getsByRek(Idrek: number){
    const param = new HttpParams().set('Idrek', Idrek.toString());
    return this.http.get(`${environment.url}Jbend/byRek`,{params: param}).pipe(map(resp => <IJbend[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jbend`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jbend`, paramBody, {observe: 'response'});
  }
  delete(paramBody: any){
    return this.http.request('DELETE',`${environment.url}Jbend`, {body: paramBody, observe: 'response'});
  }
}
