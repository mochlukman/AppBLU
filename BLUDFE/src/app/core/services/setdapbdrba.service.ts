import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetdapbdrbaService {
  constructor(private http: HttpClient) { }
  gets(params?: any):Observable<any[]>{
    const queryParam = new HttpParams({fromObject: params})
    return this.http.get<any[]>(`${environment.url}Setdapbdrba`, {params: queryParam}).pipe(map(resp => <any[]>resp));
  }
  post(postbody: any){
    return this.http.post(`${environment.url}Setdapbdrba`, postbody, {observe: 'response'});
  }
  delete(id: number){
    return this.http.request('DELETE', `${environment.url}Setdapbdrba/${id}`, {observe: 'response'});
  }
}
