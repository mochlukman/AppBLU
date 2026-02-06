import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PotonganService {

  constructor(private http: HttpClient) { }
  gets(...arg): Observable<any[]>{
    const qp = new HttpParams()
      .set('Kdpot', arg[0]['kdpot'] ? arg[0]['kdpot'] : '')
      .set('Nmpot', arg[0]['nmpot'] ? arg[0]['nmpot'] : '')
      .set('Type', arg[0]['type'] ? arg[0]['type'] : '');
    return this.http.get<any[]>(`${environment.url}Potongan`, {params: qp}).pipe(map(resp => <any[]>resp));
  }
  get(Idpot: number) {
    return this.http.get(`${environment.url}Potongan/${Idpot}`).pipe(map(resp => <any>resp))
  }
  post(postbody: any){
    return this.http.post(`${environment.url}Potongan`, postbody, {observe: 'response'});
  }
  put(postbody: any){
    return this.http.put(`${environment.url}Potongan`, postbody, {observe: 'response'});
  }
  delete(Idpot: number){
    return this.http.request('DELETE', `${environment.url}Potongan/${Idpot}`, {observe: 'response'});
  }
}
