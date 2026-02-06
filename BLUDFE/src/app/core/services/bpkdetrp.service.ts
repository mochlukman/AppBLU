import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpkdetrp } from '../interface/ibpkdetrp';

@Injectable({
  providedIn: 'root'
})
export class BpkdetrpService {

  constructor(private http: HttpClient) { }
  gets(Idbpkdetr: number) : Observable<IBpkdetrp[]>{
    const param = new HttpParams()
      .set('Idbpkdetr', Idbpkdetr.toString());
    return this.http.get<IBpkdetrp[]>(`${environment.url}Bpkdetrp`, {params: param})
      .pipe(map(resp => <IBpkdetrp[]>resp));
  }
  get(Idbpkdetrp:number) : Observable<IBpkdetrp>{
    return this.http.get(`${environment.url}Bpkdetrp/${Idbpkdetrp}`)
      .pipe(map(resp => <IBpkdetrp>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bpkdetrp`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bpkdetrp`, paramBody, {observe: 'response'});
  }
  delete(Idbpkdetrp:number){
    return this.http.request('DELETE', `${environment.url}Bpkdetrp/${Idbpkdetrp}`, {observe: 'response'});
  }
}