import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISpj} from 'src/app/core/interface/ispj';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpjapbddetService {
  constructor(private http: HttpClient) { }
  gets(param: any) : Observable<any[]>{
    return this.http.get<ISpj[]>(`${environment.url}Spjapbddet`,{params: param}).pipe(map(resp => <ISpj[]>resp));
  }
  getPaging(param: any){
    return this.http.get(`${environment.url}Spjapbddet/paging`,{params: param}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spjapbddet`, paramBody, {observe:'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Spjapbddet`, paramBody, {observe:'response'});
  }
  delete(id: number){
    return this.http.request('DELETE', `${environment.url}Spjapbddet/${id}`, {observe: 'response'});
  }
}
