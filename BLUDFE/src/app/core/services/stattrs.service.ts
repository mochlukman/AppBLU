import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStattrs } from '../interface/istattrs';

@Injectable({
  providedIn: 'root'
})
export class StattrsService {

  constructor(private http: HttpClient) { }
  gets(){
    return this.http.get(`${environment.url}Stattrs`)
      .pipe(map(resp => <IStattrs[]>resp));
  }
  get(Kdstatus: string){
    return this.http.get<IStattrs>(`${environment.url}Stattrs/${Kdstatus}`)
      .pipe(map(resp => <IStattrs>resp));
  }
  getBylist(Kdstatus: string): Observable<IStattrs[]>{ //string delimiter coma
    const param = new HttpParams().set('Kdstatus', Kdstatus);
    return this.http.get<IStattrs[]>(`${environment.url}Stattrs/listKode`, {params: param})
      .pipe(map(resp => <IStattrs[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Stattrs`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Stattrs`, paramBody, {observe: 'response'});
  }
  delete(Kdstatus: string){
    return this.http.request('DELETE', `${environment.url}Stattrs/${Kdstatus}`, {observe: 'response'});
  }
}
