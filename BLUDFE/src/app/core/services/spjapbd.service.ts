import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ISpj} from 'src/app/core/interface/ispj';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpjapbdService {
  constructor(private http: HttpClient) { }
  gets(param: any) : Observable<any[]>{
    return this.http.get<ISpj[]>(`${environment.url}Spjapbd`,{params: param}).pipe(map(resp => <ISpj[]>resp));
  }
  getPaging(param: any){
    return this.http.get(`${environment.url}Spjapbd/paging`,{params: param}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spjapbd`, paramBody, {observe:'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Spjapbd`, paramBody, {observe:'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Spjapbd/pengesahan`, paramBody, {observe:'response'});
  }
  delete(id: number){
    return this.http.request('DELETE', `${environment.url}Spjapbd/${id}`, {observe: 'response'});
  }
}
